import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { ProductRequestService } from '../services/productRequest.service';
import { CreateProductRequestDto } from '../dtos/createProductRequest.dto';
import { UpdateProductRequestDto } from '../dtos/updateProductRequest.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product Request')
@Controller('product-request')
export class ProductRequestController {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly productRequestService: ProductRequestService,
    ){}
    
    @Post()
        async createProductRequest(@Body() createProductRequestDto: CreateProductRequestDto ){
           const productRequest = await this.productRequestService.createProductRequest(createProductRequestDto)
            // await this.notificationService.sendNotificationToAdmin(createProductRequestDto)
            return {message: "Productos cargados, seran revisados por el administrador", productRequest}
        }


    @Put(':id')
        async updateProductRequest(@Param('id') id: string, @Body() productRequest: UpdateProductRequestDto) {
            const {productId, status} = productRequest
            await this.productRequestService.updateProductRequest(id, productId, status)
            return {message:"Los productos se han aceptado correctamente"}
        }

    @Get()
        async getAllProductRequest(){
            return await this.productRequestService.getAllProductRequest()
        }

    @Get(':id')
        async getProductRequestById(@Param('id') id:string) {
            return await this.productRequestService.getProductRequestById(id)
        }
}
