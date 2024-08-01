import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Res, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/public.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() body) {
    return this.productsService.create(body);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('get-product')
  getProducct(@Req() req) {
    return this.productsService.getProducct(req.query);
  }



  @Public()
  @Post('bulkuploadxl')
  @UseInterceptors(
    FileInterceptor('filedata', {}))
  async uploadFile(@Req() req, @Res() res, @UploadedFile() filedata: Express.Multer.File) {
    try {
      const result = await this.productsService.bulkuploadaXlData(req, filedata);
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      console.log(err)
    }

  }

}
