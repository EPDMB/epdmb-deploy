import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

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
    example: '2024-07-02',
    description: 'Fecha de inicio de la feria',
  })
  @IsString()
  dateStartFair: string;

  @ApiProperty({
    example: '2024-07-03',
    description: 'Fecha de finalización de la feria',
  })
  @IsString()
  dateEndFair: string;

  @ApiProperty({
    example: 9,
    description: 'Hora de inicio de la feria (formato 24 horas)',
  })
  @IsInt()
  hourStartFair: number;

  @ApiProperty({
    example: 18,
    description: 'Hora de finalización de la feria (formato 24 horas)',
  })
  @IsInt()
  hourEndFair: number;

  @ApiProperty({
    example: 100,
    description: 'Precio de entrada a la feria',
  })
  @IsInt()
  entryPrice: number;

  @ApiProperty({
    example: 'Entrada gratis // lo recaudado es para entidad benéfica ...',
    description: 'Descripción de la entrada',
  })
  @IsString()
  entryDescription: string;

  @ApiProperty({
    example: 50,
    description: 'Número máximo de vendedores permitidos en la feria',
  })
  @IsInt()
  maxSellers: number;

  @ApiProperty({
    example: 500,
    description: 'Número máximo de compradores permitidos en la feria',
  })
  @IsInt()
  maxBuyers: number;

  @ApiProperty({
    type: () => BuyerCapacityDto, // Asegúrate de usar type: () => Clase para evitar circular dependency
    isArray: true,
    description: 'Capacidades de compradores por hora',
  })
  buyerCapacities: BuyerCapacityDto[];
}

export class BuyerCapacityDto {
  @ApiProperty({
    example: 9,
    description: 'Hora del rango',
  })
  hour: number;

  @ApiProperty({
    example: 100,
    description: 'Capacidad de compradores para esa hora',
  })
  capacity: number;
}
