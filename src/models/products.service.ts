import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepo.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productsRepo.findOneBy({ id });
  }
}
