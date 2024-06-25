import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsDto } from "./products.dto";
import { Product } from "./products.entity";


@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) {}

    @Post(':id')
    async createProducts(@Body()products: ProductsDto[], @Param('id')usuarioId: string): Promise<Product[]> {
        return await this.productsService.createProducts(products, usuarioId);
    }

    @Get()
    async getProducts(): Promise<Product[]> {
        return await this.productsService.getProducts();
    }
}