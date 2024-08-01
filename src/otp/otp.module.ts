import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { Otp } from './entities/otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[ TypeOrmModule.forFeature([Otp]) ],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [TypeOrmModule],
})
export class OtpModule {}
