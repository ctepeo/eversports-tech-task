import membershipDb from '../../test/data/memberships.json';
import membershipPeriodsDb from '../../test/data/membership-periods.json';

import { Membership, MembershipPeriod } from './membership.interface';

export class MembershipService {
  private static membership: Membership[] = membershipDb;
  private static membershipPeriods: MembershipPeriod[] = membershipPeriodsDb;

  public static async getMemberships(): Promise<Membership[] | []> {
    return this.membership || [];
  }

  public static async getMembershipPeriods(): Promise<MembershipPeriod[] | []> {
    return this.membershipPeriods || [];
  }

  public static async getLatestMembershipId(): Promise<number> {
    return Math.max(...this.membership.map((o) => o.id), 0);
  }

  public static async getLatestMembershipPeriodId(): Promise<number> {
    return Math.max(...this.membershipPeriods.map((o) => o.id), 0);
  }

  public static async storeMembership(newMembership: Membership): Promise<void> {
    // dummy storage procedure goes here, I will simply push it to the array
    this.membership.push(newMembership);
  }

  public static async storeMembershipPeriods(newMembershipPeriods: MembershipPeriod[]): Promise<void> {
    // dummy storage procedure goes here, I will simply push it to the array
    await Promise.all(newMembershipPeriods.map((period: MembershipPeriod) => this.membershipPeriods.push(period)));
  }

  public static async storeMembershipPeriod(newMembershipPeriod: MembershipPeriod): Promise<void> {
    // dummy storage procedure goes here, I will simply push it to the array
    this.membershipPeriods.push(newMembershipPeriod);
  }
}
