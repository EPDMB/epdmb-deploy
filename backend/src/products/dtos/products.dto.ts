import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ProductsDto {
  @ApiProperty({ example: 'Producto 1', description: 'Marca del producto' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'Descripción del producto', description: 'Descripción del producto' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 10, description: 'Precio del producto' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'M', description: 'Tamaño del producto' })
  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  liquidation: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: '12 mujer', description: 'Categoría del producto'})
  category: string;
}
