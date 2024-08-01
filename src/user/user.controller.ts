import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }


  @Get()
  findAll(@Req() req) {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }


  @Public()
  @Post('send-otp')
  async sendOTP(@Req() req, @Res() res) {
    const data = await this.service.sendOTP(req.body);
    return res.status(HttpStatus.OK).json(data);

  }

  @Public()
  @Post('verify-otp')
  async verifyOTP(@Req() req, @Res() res) {
    const data = await this.service.verifyOTP(req.body);
    return res.status(HttpStatus.OK).json(data);

  }
}
