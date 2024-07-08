import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../users/roles/roles.decorator';
import { Role } from '../users/roles/roles.enum';
import { RoleGuard } from '../users/roles/roles.guard';
import { SellerService } from './seller.service';
import { registerFairSwagger, updateIsVerifySellerSwagger } from './seller.swagger';
import { ApiTags } from '@nestjs/swagger';
import { CategoryDto } from 'src/categories/categories.dto';

@ApiTags('Sellers')
@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async getAllSellers() {
    return await this.sellerService.getAllSellers();
  }

  @registerFairSwagger()
  //@Roles(Role.SELLER)
  //@UseGuards(AuthGuard, RoleGuard)
  @Post(':sellerId/register/:fairId/:categoryId')
  async registerFair(
    @Param('sellerId') sellerId: string,
    @Param('fairId') fairId: string,
    @Param('fairCategoryId') fairCategoryId: string
  ) {
    return await this.sellerService.registerFair(sellerId, fairId, fairCategoryId);
  }

  @updateIsVerifySellerSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Put('activate/:sellerId')
  async updateIsVerifySeller(@Param('sellerId') sellerId: string) {
    return await this.sellerService.updateIsVerifySeller(sellerId);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Put('noactivate/:sellerId')
  async updateNoVerifySeller(@Param('sellerId') sellerId: string) {
    return await this.sellerService.updateNoVerifySeller(sellerId);
  }

  @Roles(Role.ADMIN, Role.SELLER)
  @UseGuards(AuthGuard, RoleGuard)
  @Get(':sellerId')
  async getSellerById(@Param('sellerId') sellerId: string) {
    return await this.sellerService.getSellerById(sellerId);
  }

}
