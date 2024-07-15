import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductsDto } from './products.dto';

export class CreateProductRequestDto {
  @ApiProperty({
    example: '0a5a10c3-4458-4070-9d62-198621a4a777',
    description: 'ID del vendedor'
  })
  @IsNotEmpty()
  sellerId: string;

  @ApiProperty({
    type: [ProductsDto],
    description: 'Lista de productos',
    example: [
      {
        brand: 'Producto 1',
        description: 'Descripción del producto',
        price: 10,
        size: 'M',
        photoUrl: 'http://example.com/photo.jpg',
        category: '0-12 mujer'
      }]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductsDto)
  products: ProductsDto[];

  @ApiProperty({
    example: 'd7dc6b96-f75b-4ac0-b222-29e32474d91f',
    description: 'ID de la feria'
  })
  @IsNotEmpty()
  fairId: string;

  @ApiProperty({
    example: '0-12 mujer',
    description: 'Categoría del producto'
  })
  @IsNotEmpty()
  category: string;
}
