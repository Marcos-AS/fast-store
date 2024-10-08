import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { ProductsService } from './models/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Render('products/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Products - FastStore';
    viewData['subtitle'] = 'List of products';
    viewData['products'] = await this.productsService.findAll();
    return {
      viewData: viewData,
    };
  }

  @Get(':id')
  async show(@Param() params, @Res() response) {
    //res es el objeto response de express
    const product = await this.productsService.findOne(params.id);
    if (product === null) {
      return response.redirect('/products');
    }
    const viewData = [];
    viewData['title'] = product.getName() + ' - FastStore';
    viewData['subtitle'] = product.getName() + ' - Product information';
    viewData['product'] = product;
    return response.render('products/show', { viewData: viewData });
  }
}
