import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsDniValidConstraint } from 'src/auth/auth.validator';

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
  @IsString()
  @Validate(IsDniValidConstraint)
  @ApiProperty({
    description: 'Coloque su DNI',
    example: '25293711',
  })
  dni: string;

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
  @IsString()
  @ApiProperty({
    description: 'Coloque su telefono',
    example: '1156229166',
  })
  phone: string;

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
    example: '123456789',
  })
  bank_account: string;

  @ApiProperty({
    description: 'Coloque su red social',
    example: 'instagram',
  })
  social_media?: string;
}
