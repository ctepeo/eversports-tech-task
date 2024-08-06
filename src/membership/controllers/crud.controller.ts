import { Body, Controller, Post } from '@nestjs/common';

import { CreateDto } from '../dto';

@Controller()
export class CrudController {
  @Post() // POST /membership
  public async create(@Body() body: CreateDto): Promise<{ hello: string }> {
    console.log({
      body,
    });
    return { hello: 'world' };
  }
}
