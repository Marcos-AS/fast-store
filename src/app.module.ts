import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsController } from './products.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductsService } from './models/products.service';
import config from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { UsersService } from './models/users.service';
import { User } from './models/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Product, User]),
    AdminModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    ProductsController,
    AdminController,
    AuthController,
  ],
  providers: [ProductsService, UsersService],
  exports: [ProductsService, UsersService],
})
export class AppModule {}
