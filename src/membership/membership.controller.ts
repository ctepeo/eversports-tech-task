import { Controller, Get, Post } from '@nestjs/common';
import { MembershipService } from './membership.service';

import { Membership, MembershipPeriod } from './membership.interface';

@Controller()
export class MembershipController {
  @Get() // GET /membership
  public async list(): Promise<object[]> {
    const memberships = MembershipService.getMemberships();
    const membershipPeriods = MembershipService.getMembershipPeriods();

    return memberships.map((membership: Membership) => {
      return {
        membership,
        periods: membershipPeriods.filter((period: MembershipPeriod) => period.membershipId === membership.id),
      };
    });
  }

  @Post() // POST /membership
  public async create(): Promise<{ hello: string }> {
    return { hello: 'world' };
  }
}
