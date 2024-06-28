import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsDto } from "./products.dto";
import { Product } from "./products.entity";
import { UpdateProductDTO } from "./dtos/UpdateStatus";
import { createProductsSwagger, getAllProductsSwagger, updateStatusSwagger } from "./products.swagger";
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from "src/users/roles/roles.decorator";
import { Role } from "src/users/roles/roles.enum";
import { RoleGuard } from "src/users/roles/roles.guard";


@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) {}

    @createProductsSwagger()
    @UseGuards(AuthGuard)
    @Post(':id')
    async createProducts(@Body()products: ProductsDto[], @Param('id')usuarioId: string): Promise<Product[]> {
        return await this.productsService.createProducts(products, usuarioId);
    }

    @getAllProductsSwagger()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard)
    @Get()
    async getProducts(): Promise<Product[]> {
        return await this.productsService.getProducts();
    }

    @updateStatusSwagger()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Put(':id')
    async updateStatus(@Param('id')id: string, @Body()updateProduct: UpdateProductDTO){
        return await this.productsService.updateStatus(id, updateProduct);
    }
    
}