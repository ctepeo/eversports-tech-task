import { Module } from '@nestjs/common';

import * as controllers from './controllers';

@Module({
  imports: [],
  controllers: Object.values(controllers),
  providers: [],
})
export class MembershipModule {}
