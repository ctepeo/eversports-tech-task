import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { MembershipModule } from './membership/membership.module';

@Module({
  imports: [
    MembershipModule,
    // Module Router
    // https://docs.nestjs.com/recipes/router-module
    RouterModule.register([
      {
        path: 'membership',
        module: MembershipModule,
      },
    ]),
  ],
  providers: [],
})
export class AppModule {}
