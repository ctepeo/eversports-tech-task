import { IsDate, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMembershipRequestData {
  @IsNotEmpty({ message: 'missingMandatoryFields' })
  public name!: string;

  @IsNotEmpty({ message: 'missingMandatoryFields' })
  @Min(0, { message: 'negativeRecurringPrice' })
  public recurringPrice!: number;

  //  it's kinda missing here 'weekly'
  @IsIn(['monthly', 'yearly'], { message: 'invalidBillingPeriods' })
  public billingInterval!: string;

  @IsNumber()
  public billingPeriods!: number;

  @IsString()
  //  would add here at least this
  //@IsIn(['cash'])
  public paymentMethod!: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  public validFrom!: string;
}
