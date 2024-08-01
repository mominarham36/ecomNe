import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SettingService } from './setting.service';

@Controller('setting')
export class SettingController {
  constructor(private readonly service: SettingService) {}

  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }
  

}
