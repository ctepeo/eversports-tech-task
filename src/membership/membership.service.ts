import membership from '../../test/data/memberships.json';
import membershipPeriods from '../../test/data/membership-periods.json';

import { Membership, MembershipPeriod } from './membership.interface';

export class MembershipService {
  public static getMemberships(): Membership[] {
    return membership;
  }

  public static getMembershipPeriods(): MembershipPeriod[] {
    return membershipPeriods;
  }

  // public static getMembershipPeriodsByMembershipId(membershipId: number): object {
  //   return membership.find((m: any) => m.id === id);
  // }
}
