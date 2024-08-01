// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // Import ConfigModule to access environment variables
    JwtModule.register({
      secret: 'qwertyuiop', // Directly set your JWT secret here
      signOptions: { expiresIn: '1h' }, // Customize expiration time
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Export AuthService so other modules can use it
})
export class AuthModule {}
