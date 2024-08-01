import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.middleware';
import { AddtoCartModule } from './add-to-cart/add-to-cart.module';
import { OtpModule } from './otp/otp.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SettingModule } from './setting/setting.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: 'localhost',
      database: 'test_n',
      username: "postgres",
      password: "admin",
      // entities: [
      //   User,
      //   Product
      // ],
      entities:
        [__dirname + '/**/*.entity{.ts,.js}']
      ,

      synchronize: true,


    }),
   
    UserModule,
    ProductsModule,
    AddtoCartModule,
    OtpModule,
    AuthModule,
    SettingModule
  ],
  controllers: [AppController],
  providers: [AppService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },],
})
export class AppModule { }
