import { v4 as uuidv4 } from 'uuid';

import { BadRequestException, Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MembershipService } from './membership.service';

import { Membership, MembershipState, MembershipPeriod } from './membership.interface';
import { CreateMembershipRequestData } from './membership.dto';

interface MembershipWithPeriods {
  membership: Membership;
  periods: MembershipPeriod[] | [];
}

const USER_ID: Membership['userId'] = 2000;

@Controller()
export class MembershipController {
  /**
   * Get all memberships with their periods
   */
  @Get() // GET /membership
  public async list(): Promise<MembershipWithPeriods[] | []> {
    const [memberships, membershipPeriods] = await Promise.all([MembershipService.getMemberships(), MembershipService.getMembershipPeriods()]);

    return memberships.map((membership: Membership): MembershipWithPeriods => {
      return {
        membership,
        periods: membershipPeriods.filter((period: MembershipPeriod): boolean => period.membershipId === membership.id),
      };
    });
  }

  /**
   * Create a new membership
   */
  @HttpCode(201)
  @Post() // POST /membership
  @UsePipes(new ValidationPipe({ transform: true }))
  public async create(@Body() body: CreateMembershipRequestData): Promise<any> {
    //  extended validation logic goes here
    if (body.recurringPrice > 100 && body.paymentMethod === 'cash') {
      throw new BadRequestException('cashPriceBelow100');
    }

    switch (body.billingInterval) {
      case 'monthly':
        if (body.billingPeriods > 12) {
          throw new BadRequestException('billingPeriodsMoreThan12Months');
        }
        if (body.billingPeriods < 6) {
          throw new BadRequestException('billingPeriodsLessThan6Months');
        }
        break;
      case 'yearly':
        if (body.billingPeriods > 3) {
          //  billingPeriodsLessThan3Years here is a bug, but my task is to re-create the response
          throw new BadRequestException(body.billingPeriods > 10 ? 'billingPeriodsMoreThan10Years' : 'billingPeriodsLessThan3Years');
        }
        break;
    }

    const validFrom: Date = body.validFrom ? new Date(body.validFrom) : new Date();
    //  we already know here that it's not possible to have 'weekly' or any other option rather than 'monthly'
    //  or 'yearly' as a billing interval, so even if it looks stupid, it's correct
    const validUntil: Date = new Date(validFrom);
    validUntil.setMonth(validUntil.getMonth() + (body.billingInterval === 'monthly' ? 1 : 12) * body.billingPeriods);

    let state: MembershipState = MembershipState.ACTIVE;
    if (validFrom > new Date()) {
      state = MembershipState.PENDING;
    }
    if (validUntil < new Date()) {
      state = MembershipState.EXPIRED;
    }

    const membershipId = (await MembershipService.getLatestMembershipId()) + 1;

    const newMembership: Membership = {
      id: membershipId,
      userId: USER_ID,
      uuid: uuidv4(),
      name: body.name,
      recurringPrice: body.recurringPrice,
      billingInterval: body.billingInterval,
      billingPeriods: body.billingPeriods,
      paymentMethod: body.paymentMethod,
      validFrom: validFrom.toISOString(),
      validUntil: validUntil.toISOString(),
      state,
    };

    await MembershipService.storeMembership(newMembership);

    const newMembershipPeriods: MembershipPeriod[] = [];
    let periodStart: Date = new Date(validFrom);
    //   in a perfect world we need to do it in a service just before storing
    let lastMembershipPeriodId = await MembershipService.getLatestMembershipPeriodId();

    for (let i: number = 0; i < body.billingPeriods; i++) {
      const start: Date = periodStart;
      const end: Date = periodStart;
      end.setMonth(end.getMonth() + (body.billingInterval === 'monthly' ? 1 : 12) * (i + 1));

      lastMembershipPeriodId++;

      newMembershipPeriods.push({
        id: lastMembershipPeriodId,
        uuid: uuidv4(),
        membershipId,
        start: start.toISOString(),
        end: end.toISOString(),
        state: MembershipState.PENDING,
      });

      periodStart = new Date(end);
    }

    await MembershipService.storeMembershipPeriods(newMembershipPeriods);

    return { membership: newMembership, membershipPeriods: newMembershipPeriods };
  }
}
