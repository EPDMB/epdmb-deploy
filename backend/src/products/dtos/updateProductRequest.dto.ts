import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { ProductStatus } from '../enum/productStatus.enum';

export class UpdateProductRequestDto {
    @ApiProperty({
        example: '0a5a10c3-4458-4070-9d62-198621a4a777',
        description: 'ID del producto'
    })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({
        example: 'VERDE',
        description: 'Estado del producto'
    })
    @IsString()
    @IsNotEmpty()
    status: ProductStatus;
}
