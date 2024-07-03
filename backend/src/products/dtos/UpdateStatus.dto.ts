

import { IsEnum } from 'class-validator';
import { ProductStatus } from '../enum/productStatus.enum';

export class UpdateProductDTO {
  @IsEnum(ProductStatus)
  status: ProductStatus	;
}