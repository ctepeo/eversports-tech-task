import { Controller, Get, Post } from '@nestjs/common';
import { MembershipService } from './membership.service';

import { Membership, MembershipPeriod } from './membership.interface';

interface MembershipWithPeriods {
  membership: Membership;
  periods: MembershipPeriod[] | [];
}

@Controller()
export class MembershipController {
  @Get() // GET /membership
  public async list(): Promise<MembershipWithPeriods[] | []> {
    const memberships: Membership[] | [] = MembershipService.getMemberships();
    const membershipPeriods: MembershipPeriod[] | [] = MembershipService.getMembershipPeriods();

    return memberships.map((membership: Membership): MembershipWithPeriods => {
      return {
        membership,
        periods: membershipPeriods.filter((period: MembershipPeriod): boolean => period.membershipId === membership.id),
      };
    });
  }

  @Post() // POST /membership
  public async create(): Promise<{ hello: string }> {
    return { hello: 'world' };
  }
}
