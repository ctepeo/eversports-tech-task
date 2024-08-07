export interface Membership {
  id: number; // the id of the membership
  uuid: string; // the uuid of the membership
  name: string; // name of the membership
  userId: number; // the user that the membership is assigned to
  recurringPrice: number; // price the user has to pay for every period
  validFrom: string; // start of the validity
  validUntil: string; // end of the validity
  assignedBy: string; // the user that assigned the membership
  state: string; // indicates the state of the membership
  paymentMethod: string | null; // which payment method will be used to pay for the periods
  billingInterval: string; // the interval unit of the periods
  billingPeriods: number; // the number of periods the membership has
}

export interface MembershipPeriod {
  id: number; // the id of the period
  membershipId: number; // membership the period is attached to
  start: string; // indicates the start of the period
  end: string; // indicates the end of the period
  state: string;
}
