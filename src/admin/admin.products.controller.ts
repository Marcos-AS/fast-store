import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from 'src/models/product.entity';
import { ProductsService } from 'src/models/products.service';
import { ProductValidator } from 'src/validators/product.validator';
import * as fs from 'fs';

@Controller('/admin/products')
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @Render('admin/products/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Admin Page - Admin - Online Store';
    viewData['products'] = await this.productsService.findAll();
    return {
      viewData: viewData,
    };
  }

  @Post('/store') //ruta del form
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' })) //sube la img que viene del form a este destino. 'image' es el valor del atr. name del input
  @Redirect('/admin/products')
  async store(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
    @Req() request,
  ) {
    const toValidate: string[] = [
      'name',
      'description',
      'price',
      'imageCreate',
    ];
    const errors: string[] = ProductValidator.validate(body, file, toValidate);
    if (errors.length > 0) {
      if (file) {
        fs.unlinkSync(file.path); //remove file from filesystem
      }
      request.session.flashErrors = errors; //se almacena aca para luego mostrar en view
    } else {
      const newProduct = new Product();
      newProduct.setName(body.name);
      newProduct.setDescription(body.description);
      newProduct.setPrice(body.price);
      newProduct.setImage(file.filename);
      await this.productsService.createOrUpdate(newProduct);
    }
  }

  @Post('/:id')
  @Redirect('/admin/products')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }

  @Get('/:id')
  @Render('admin/products/edit')
  async edit(@Param('id') id: number) {
    const viewData = [];
    viewData['title'] = 'Admin Page - Edit Product - Online Store';
    viewData['product'] = await this.productsService.findOne(id);
    return {
      viewData: viewData,
    };
  }

  @Post('/:id/update')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  async update(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Req() request,
    @Res() response,
  ) {
    const toValidate: string[] = [
      'name',
      'description',
      'price',
      'imageUpdate',
    ];
    const errors: string[] = ProductValidator.validate(body, file, toValidate);
    if (errors.length > 0) {
      if (file) {
        fs.unlinkSync(file.path); //remove file from filesystem
      }
      request.session.flashErrors = errors; //se almacena aca para luego mostrar en view
      return response.redirect('/admin/products/' + id);
    } else {
      const product = await this.productsService.findOne(id);
      product.setName(body.name);
      product.setDescription(body.description);
      product.setPrice(body.price);
      if (file) {
        product.setImage(file.filename);
      }
      await this.productsService.createOrUpdate(product);
      return response.redirect('/admin/products');
    }
  }
}
