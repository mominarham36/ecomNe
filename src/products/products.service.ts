import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
const excelToJson = require('convert-excel-to-json');

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>,
  ) {

  }
  async create(body) {
    const response = { message: 'Invalid request', responseCode: 400, token: null };
    try {
      await this.repository.save(body)
      response.message = 'product added';
      response.responseCode = 200;

    } catch (error) {
      console.log(error);
      response.message = 'Failed to save';
      response.responseCode = 400;
    }
    return response;
  }

  async findAll() {
    const response = { message: 'Invalid request', responseCode: 400,data:null };
    try {
      const product = await this.repository.find()
      response.data = product;
      response.message = 'deleted succefully';
      response.responseCode = 200;
    } catch (error) {
      console.log(error);
      response.message = 'Failed to save';
      response.responseCode = 400;
    }
    return response;;
  }


  async getProducct(query) {
    const response = { message: 'Invalid request', responseCode: 400, data: null };
    try {
      let nameQuerry = query.name ? `where name like '%${query.name}%'` : ``
      const product = await this.repository.query(
        `
      SELECT id, name, image, amount, "createdTimestamp"
	      FROM products
        ${nameQuerry}
         order by "createdTimestamp" desc
        `
      )
      response.data = product
      response.message = 'data';
      response.responseCode = 200;
    } catch (error) {
      console.log(error);
      response.message = 'Failed to save';
      response.responseCode = 400;
    }
    return response;;
  }

  async bulkuploadaXlData(body, fileData): Promise<any> {
    const response = {
      message: 'Invalid request',
      responseCode: 400,
    }
    try {
      if (!fileData) {
        return { err: "No file selected" }
      }
      const result = excelToJson({
        source: fileData.buffer,
        header: {
          rows: 1
        },
        sheets: 'Sheet1',
        columnToKey: {
          A: 'name',
          B: 'image',
          C: 'amount'

        }
      });
      let excelJson = result.Sheet1
      for (let i = 0; i < excelJson.length; i++) {
        const product = await this.repository.findOne({ where: { name: excelJson[i].name } })
        if (product) {
          await this.repository.update({ id: product.id }, { amount: excelJson[i].amount, image: excelJson[i].image })
        } else {
          const payload = {
            name: excelJson[i].name,
            amount: excelJson[i].amount,
            image: excelJson[i].image
          }
          await this.repository.save(payload)
        }

      }
      response.message = 'succesfully done';
      response.responseCode = 200
    } catch (error) {
      console.log(error)
      response.message = 'something went wrong';
      response.responseCode = 400
    }
    return response;
  }
}
