import {
    Body,
    Controller,
    Get
} from '@nestjs/common';

import {ListDto} from '../dto';


@Controller()
export class ListController {
    @Get() // GET /membership
    public async list(@Body() body: ListDto): Promise<{ id: number }> {
        console.log({body});
        throw new Error('not implemented');
    }
}

