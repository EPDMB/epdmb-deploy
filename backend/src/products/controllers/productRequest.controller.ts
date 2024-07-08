import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { ProductRequestService } from '../services/productRequest.service';
import { CreateProductRequestDto } from '../dtos/createProductRequest.dto';
import { ProductsService } from '../services/products.service';
import { UpdateProductRequestDto } from '../dtos/updateProductRequest.dto';

@Controller('product-request')
export class ProductRequestController {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly productRequestService: ProductRequestService,
    ){}
    
    @Post()
        async createProductRequest(@Body() createProductRequestDto: CreateProductRequestDto ){
            const productRequest = await this.productRequestService.createProductRequest(createProductRequestDto)
            await this.notificationService.sendNotificationToAdmin(createProductRequestDto)
            return {message: "Productos cargados, seran revisados por el administrador"}
        }


    @Put(':id')
        async updateProductRequest(@Param('id') id: string, @Body() updateProductRequestDto: UpdateProductRequestDto ){
            const productRequest = await this.productRequestService.updateProductRequest(id, updateProductRequestDto)
            return {message:"Los productos se han aceptado correctamente"}
        }
}
