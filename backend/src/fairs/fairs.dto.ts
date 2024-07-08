import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryDto } from 'src/categories/categories.dto';
import { ProductsDto } from 'src/products/dtos/products.dto';

export class FairDto {
  @ApiProperty({
    example: 'Feria de Verano',
    description: 'Nombre de la feria',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Avenida Principal 123',
    description: 'Dirección de la feria',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 100,
    description: 'Precio de entrada a la feria',
  })
  @IsInt()
  entryPriceBuyer: number;

  @ApiProperty({
    example: 1000,
    description: 'Precio de entrada a la feria',
  })
  @IsInt()
  entryPriceSeller: number;

  @ApiProperty({
    example: 'Entrada gratis // lo recaudado es para entidad benéfica ...',
    description: 'Descripción de la entrada',
  })
  @IsString()
  entryDescription: string;

  @IsArray()
  @IsNotEmpty()
  fairDays: FairDayDto[];

  @IsArray()
  @ApiProperty({
    description: 'Categorias de la feria, con sus maximos vendedores y max y min productos',
  })
  fairCategories: FairCategoryDto[] ; 
}

export class FairCategoryDto {
  @ApiProperty({
    example: 120,
    description: 'Maximo de productos por vendedor por categoria',
  })
  @IsInt()
  maxProductsSeller: number

  @ApiProperty({
    example: 10,
    description: 'Minimo de productos por vendedor por categoria',
  })
  @IsInt()
  minProductsSeller: number 

  @ApiProperty({
    example: 10,
    description: 'Maximo de vendedores por categoria',
  })
  @IsInt()
  maxSellers: number

  @IsOptional()
  @ApiProperty({
    example: "0-12 mujer",
    description: 'categoria a la que pertenece',
  })
  category: CategoryDto[] | CategoryDto
}



export class FairDayDto {
  @ApiProperty({
    example: 'Lunes',
    description: 'Dia de la feria',
  })
  @IsNotEmpty()
  day: Date;

  @ApiProperty({
    example: '10:00',
    description: 'Hora de apertura',
  })
  @IsArray()
  @IsNotEmpty()
  buyerCapacities: BuyerCapacityDto[];
}
export class BuyerCapacityDto {
  @ApiProperty({
    example: "9",
    description: 'Hora del rango',
  })
  hour: string;

  @ApiProperty({
    example: 100,
    description: 'Capacidad de compradores para esa hora',
  })
  capacity: number;
}
