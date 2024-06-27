import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class FairDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  @IsString()
  @ApiProperty({
    description: 'Coloque el nombre de la feria',
    example: 'Feriacity',
  })
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  @IsString()
  @ApiProperty({
    description: 'Coloque la direccion de la feria',
    example: 'Calle falsa 123',
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Coloque la fecha de inicio',
    example: '2022-01-01',
  })
  dateStartFair: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Coloque la fecha de inicio',
    example: '2022-01-01',
  })
  dateEndFair: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Coloque el horario de inicio de la feria',
    example: 10,
  })
  hourStartFair: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Coloque el horario de inicio de la feria',
    example: 20,
  })
  hourEndFair: number;


  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Coloque el precio de la entrada',
    example: '100',
  })
  entryPrice: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description:
      'Coloque la descripción de la entrada, si es gratutita o no, en caso de que no, especificar el destino de la plata recaudada',
    example: 'Entrada gratis',
  })
  entryDescription: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Coloque el maximo de vendedores',
    example: '10',
  })
  maxSellers: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Coloque el maximo de compradores por hora',
    example: '10',
  })
  maxBuyers: number;
}
