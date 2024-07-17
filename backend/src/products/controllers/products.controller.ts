import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProductsService } from "../services/products.service";
import { ProductsDto } from '../dtos/products.dto';
import { Product } from "../entities/products.entity";
import { UpdateProductDTO } from "../dtos/UpdateStatus.dto";
import { createProductsSwagger, getAllProductsSwagger, updateStatusSwagger } from "../products.swagger";
import { AuthGuard } from '../../auth/auth.guard';
import { Roles } from "../../users/roles/roles.decorator";
import { Role } from "../../users/roles/roles.enum";
import { RoleGuard } from "../../users/roles/roles.guard";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('Products')
@Controller('products')
export class ProductsController {
    
    constructor(
        private readonly productsService: ProductsService
    ) {}

     @createProductsSwagger()
     @Roles(Role.SELLER)
     @UseGuards(AuthGuard, RoleGuard)
    @Post(':sellerId/:fairsId')
    async createProducts(
        @Body('createProducts')createProducts: {products:ProductsDto[], category: string}, 
        @Param('sellerId')sellerId: string, 
        @Param('fairsId')fairId: string) {
        const {products, category} = createProducts
        return await this.productsService.createProducts(products, sellerId, fairId, category);
    }

    @getAllProductsSwagger()
    @Roles(Role.ADMIN)
   @UseGuards(AuthGuard, RoleGuard)
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

    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RoleGuard)
    @Get('seller/:sellerId')
    async getSellerProducts(@Param('sellerId')sellerId: string) {
        return await this.productsService.getSellerProducts(sellerId)
    }
  
    @Roles(Role.ADMIN, Role.SELLER)
    @UseGuards(AuthGuard, RoleGuard)
    @Get(':id')
    async getProductById(@Param('id')id: string): Promise<Product> {
        return await this.productsService.getProductById(id);
    }
}