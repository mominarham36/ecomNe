import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtpService } from './otpservice';

@Controller('otp')
export class OtpController {
  constructor(private readonly service: OtpService) {}

}