import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AddtoCartService } from './add-to-cart.service';

@Controller('add-to-cart')
export class AddtoCartController {
  constructor(private readonly service: AddtoCartService) {}

  @Post()
  create(@Body() body,@Req() req) {
    return this.service.create(body,req);
  }

  @Get('get-user-cart')
  getUserCart(@Req() req) {
    return this.service.getUserCart(req.query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
