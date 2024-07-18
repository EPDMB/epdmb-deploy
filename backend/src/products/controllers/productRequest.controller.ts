import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { ProductRequestService } from '../services/productRequest.service';
import { CreateProductRequestDto } from '../dtos/createProductRequest.dto';
import { UpdateProductRequestDto } from '../dtos/updateProductRequest.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/users/roles/roles.guard';
import {
  createProductRequestSwagger,
  getAllProductsRequestSwagger,
  getProductsSellerSwagger,
  updateStatusProductRequestSwagger,
} from '../productsRequest.swagger';
import { StatusProductRequest } from '../enum/statusProductRequest.enum';

@ApiTags('Product Request')
@Controller('product-request')
export class ProductRequestController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly productRequestService: ProductRequestService,
  ) {}

  @createProductRequestSwagger()
  // @Roles(Role.SELLER)
  // @UseGuards(AuthGuard, RoleGuard)
  @Post()
  async createProductRequest(
    @Body() createProductRequestDto: CreateProductRequestDto,
  ) {
    const productRequest =
      await this.productRequestService.createProductRequest(
        createProductRequestDto,
      );
    // await this.notificationService.sendNotificationToAdmin(createProductRequestDto)
    return {
      message: 'Productos cargados, seran revisados por el administrador',
      productRequest,
    };
  }

  @updateStatusProductRequestSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Put(':id')
  async updateProductRequest(
    @Param('id') id: string,
    @Body() productRequest: UpdateProductRequestDto,
  ) {
    const { productId, status } = productRequest;
    await this.productRequestService.updateProductRequest(
      id,
      productId,
      status,
    );
    return { message: 'El producto ha sido clasificado correctamente' };
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Put('check/:id')
  async checkedProductRequest(
    @Param('id') id: string,
  ) {
    await this.productRequestService.checkedProductRequest(id);
    return { message: 'El productrequest ha sido actualizado correctamente' };
  }

  @getAllProductsRequestSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async getAllProductRequest() {
    return await this.productRequestService.getAllProductRequest();
  }

  @getProductsSellerSwagger()
  // @Roles(Role.SELLER, Role.ADMIN)
  // @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  async getProductRequestById(@Param('id') id: string) {
    return await this.productRequestService.getProductRequestById(id);
  }
}
