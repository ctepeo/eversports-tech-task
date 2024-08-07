import { describe, expect, test } from '@jest/globals';
import { MembershipController } from '../../src/membership/membership.controller';
import { MembershipService } from '../../src/membership/membership.service';
import { jest } from '@jest/globals';

describe('Membership controller', () => {
  let membershipController: MembershipController;

  beforeAll(() => {
    const membershipsMock = [
      {
        id: 42,
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Platinum Plan',
        userId: 1111,
        recurringPrice: 150.0,
        validFrom: '2023-01-01',
        validUntil: '2023-12-31',
        state: 'active',
        assignedBy: 'Admin',
        paymentMethod: 'credit card',
        billingInterval: 'monthly',
        billingPeriods: 12,
      },
      {
        id: 86,
        uuid: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Gold Plan',
        userId: 1111,
        recurringPrice: 100.0,
        validFrom: '2023-01-01',
        validUntil: '2023-12-31',
        state: 'active',
        assignedBy: 'Admin',
        paymentMethod: 'credit card',
        billingInterval: 'monthly',
        billingPeriods: 12,
      },
    ];

    const membershipPeriodsMock = [
      {
        id: 42,
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        membershipId: 42,
        start: '2023-01-01',
        end: '2023-02-01',
        state: 'active',
      },
      {
        id: 86,
        uuid: '123e4567-e89b-12d3-a456-426614174001',
        membershipId: 42,
        start: '2023-02-01',
        end: '2023-03-01',
        state: 'active',
      },
    ];

    jest.spyOn(MembershipService, 'getMemberships').mockImplementation(async () => membershipsMock);
    jest.spyOn(MembershipService, 'getMembershipPeriods').mockImplementation(async () => membershipPeriodsMock);
  });

  beforeEach(() => {
    membershipController = new MembershipController();
  });

  describe('list()', () => {
    describe('positive', () => {
      test('should return dummy data', async () => {
        const result = await membershipController.list();

        expect(result).toHaveLength(2);

        expect(result[0]).toHaveProperty('membership');
        expect(result[0]).toHaveProperty('periods');

        expect(result[0].membership).toHaveProperty('id', 42);
        expect(result[1].membership).toHaveProperty('id', 86);

        expect(result[0].periods).toHaveLength(2);
        expect(result[1].periods).toHaveLength(0);

        expect(result[0].periods[0]).toHaveProperty('uuid', '123e4567-e89b-12d3-a456-426614174000');
      });
    });
  });
});
