import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { Role } from '../users/roles/roles.enum';
import { IsDniValidConstraint } from 'src/auth/auth.validator';
import { Type } from 'class-transformer';

export class RegisterUserDto {
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

  @IsString()
  @Validate(IsDniValidConstraint)
  @ApiProperty({
    description: 'Coloque su DNI',
    example: '25293711',
  })
  dni?: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Coloque su correo',
    example: 'juanperez@ejemplo.com',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, {
    message: 'La contraseña es muy debil',
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
    message: 'La contraseña es muy debil',
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

  @IsEmpty()
  role: Role;
}
export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Coloque su correo',
    example: 'juanperez@ejemplo.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Coloque su contraseña',
    example: 'Password1!',
  })
  password: string;

  @IsNotEmpty() 
  @ApiProperty({
    description: 'Coloque si desea recordar la sesión',
    example: 'true',
  })
  @Type(() => Boolean)
  rememberMe: boolean;

}

export class ResetPasswordDto extends PickType(RegisterUserDto, [
  'password',
  'confirmPassword',
]) {}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, {
    message: 'La contraseña es muy debil',
  })
  @ApiProperty({
    description: 'Coloque su contraseña actual',
    example: 'Password1!',
  })
  @IsString()
  current_password: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, {
    message: 'La contraseña es muy debil',
  })
  @ApiProperty({
    description: 'Coloque su nueva contraseña',
    example: 'Password2!',
  })
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, {
    message: 'La contraseña es muy debil',
  })
  @ApiProperty({
    description: 'Coloque su nueva contraseña',
    example: 'Password2!',
  })
  @IsString()
  confirmNewPassword: string;
}

export class RegisterUserFairDto {
  @ApiProperty({
    example: '10:00',
    description: 'Hora seleccionada para la inscripción (formato 24 horas)',
  })
  @IsString()
  selectedHour: string;

  @ApiProperty({
    example: '2024-07-14',
    description: 'Fecha seleccionada para la inscripción (formato ISO)',
  })
  @IsNotEmpty()
  @Type(() => Date)
  selectedDay: Date; 
}

