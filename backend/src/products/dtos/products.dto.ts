import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ProductsDto {
  @ApiProperty({
    description: 'El nombre del producto',
    example: 'Producto de ejemplo',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'La descripción del producto',
    example: 'Descripción del producto de ejemplo',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'El precio del producto',
    example: 19.99,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'La URL de la imagen del producto',
    example: 'https://example.com/product-image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  photoUrl: string;

  @ApiProperty({
    description: 'El estado del producto',
    example: 'Activo',
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
