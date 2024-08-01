import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { OtpModule } from 'src/otp/otp.module';
import { AuthService } from 'src/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { SettingModule } from 'src/setting/setting.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    OtpModule,
    AuthModule,
    SettingModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
  
})
export class UserModule { }
