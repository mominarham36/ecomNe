import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddtoCart } from './entities/add-to-cart.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Setting } from 'src/setting/entities/setting.entity';


@Injectable()
export class AddtoCartService {

  constructor(
    @InjectRepository(AddtoCart) private readonly repository: Repository<AddtoCart>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Setting) private readonly settingRepository: Repository<Setting>,
  ) {

  }

  async create(body, decodedUser) {
    const response = { message: 'Invalid request', responseCode: 400, token: null };
    try {
      const setting = await this.settingRepository.findOne({ where: {} })
      const userId = decodedUser.is
      if (body.quantity <= setting.maxQuantity) {
        if (body.quantity > 0) {
          const product = await this.productRepository.findOne({ where: { id: body.productId } })
          const totalAmount = product.amount * body.quantity
          const check = await this.repository.findOne({ where: { productId: body.product, userId: userId, status: 0 } })
          if (check) {
            await this.repository.update({ id: check.id }, { quantity: body.quantity, totalAmount: totalAmount })
            response.message = 'successfully upated cart';
            response.responseCode = 200;
          } else {
            const payload = {
              quantity: body.quantity,
              totalAmount: totalAmount,
              userId: userId,
              productId: body.productId,
              status: 0
            }
            await this.repository.save(payload)
            response.message = 'successfully added to cart';
            response.responseCode = 200;
          }

        } else {
          response.message = 'quantity cant be negative or zero';
          response.responseCode = 200;
          return response
        }
      } else {
        response.message = `quantity cant be greater than ${setting.maxQuantity}`;
        response.responseCode = 200;
        return response
      }
    } catch (error) {
      console.log(error);
      response.message = 'Failed to save';
      response.responseCode = 400;
    }
    return response;
  }


  async getUserCart(params) {
    const response = { message: 'Invalid request', responseCode: 400, data: null };
    try {
      const data = await this.repository.find({ where: { userId: params.userId, status: 0 } })
      response.message = ' data';
      response.responseCode = 200;
      response.data = data;
      return response
    } catch (error) {
      console.log(error);
      response.message = 'Failed to save';
      response.responseCode = 400;
    }
    return response;
  }

  async remove(id: number) {
    const response = { message: 'Invalid request', responseCode: 400 };
    try {
      await this.repository.delete({ id: id })
      response.message = 'deleted succefully';
      response.responseCode = 200;
    } catch (error) {
      console.log(error);
      response.message = 'Failed to save';
      response.responseCode = 400;
    }
    return response;;
  }

}
