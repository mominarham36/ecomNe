import { Module } from '@nestjs/common';
import { AddtoCartService } from './add-to-cart.service';
import { AddtoCartController } from './add-to-cart.controller';
import { AddtoCart } from './entities/add-to-cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[ TypeOrmModule.forFeature([AddtoCart]) ],
  controllers: [AddtoCartController],
  providers: [AddtoCartService],
  exports: [TypeOrmModule],
})
export class AddtoCartModule {}
