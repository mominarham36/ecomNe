import { Module } from '@nestjs/common';
import { AddtoCartService } from './add-to-cart.service';
import { AddtoCartController } from './add-to-cart.controller';
import { AddtoCart } from './entities/add-to-cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { SettingModule } from 'src/setting/setting.module';

@Module({
  imports: [TypeOrmModule.forFeature([AddtoCart]),
    ProductsModule,
    SettingModule
  ],
  controllers: [AddtoCartController],
  providers: [AddtoCartService],
  exports: [TypeOrmModule],
})
export class AddtoCartModule { }
