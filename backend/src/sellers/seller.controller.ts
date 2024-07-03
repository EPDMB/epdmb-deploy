import { Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../users/roles/roles.decorator';
import { Role } from '../users/roles/roles.enum';
import { RoleGuard } from '../users/roles/roles.guard';
import { SellerService } from './seller.service';
import { registerFairSwagger, updateIsVerifySellerSwagger } from './seller.swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sellers')
@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @registerFairSwagger()
  @Roles(Role.SELLER)
  @UseGuards(AuthGuard, RoleGuard)
  @Post(':sellerId/register/:fairId')
  async registerFair(
    @Param('sellerId') sellerId: string,
    @Param('fairId') fairId: string,
  ) {
    return await this.sellerService.registerFair(sellerId, fairId);
  }

  @updateIsVerifySellerSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Put(':sellerId')
  async updateIsVerifySeller(@Param('sellerId') sellerId: string) {
    return await this.sellerService.updateIsVerifySeller(sellerId);
  }
}
