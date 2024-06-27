import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class RegisterSellerDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  @IsString()
  @ApiProperty({
    description: 'Coloque su nombre',
    example: 'Juan',
  })
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  @IsString()
  @ApiProperty({
    description: 'Coloque su nombre',
    example: 'Perez',
  })
  lastname: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1000000)
  @Max(99999999)
  @ApiProperty({
    description: 'Coloque su DNI',
    example: '25293711',
  })
  dni: number;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Coloque su correo',
    example: 'juanperez@ejemplo.com',
  })
  email: string;

  @IsString()
  @ApiProperty()
  @MinLength(3)
  @MaxLength(25)
  @IsOptional()
  @ApiProperty({
    description: 'Coloque su direccion',
    example: 'Calle Siempre Viva 123',
  })
  address?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Coloque su telefono',
    example: '1156229166',
  })
  phone: number;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, {
    message: 'El password es muy debil',
  })
  @IsString()
  @ApiProperty({
    description:
      'Coloque su contraseña, debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial',
    example: 'Password1!',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, {
    message: 'El password es muy debil',
  })
  @IsString()
  @ApiProperty({
    description: 'Repita su contraseña',
    example: 'Password1!',
  })
  confirmPassword: string;

  @IsString()
  @IsOptional()
  profile_picture?: string;

  @ApiProperty({
    description: 'Coloque su cuenta bancaria',
  })
  bank_account: string;

  @ApiProperty({
    description: 'Coloque su sku',
  })
  sku: string;
  
  @ApiProperty({
    description: 'Coloque su red social',
  })
  social_media?: string;
}
