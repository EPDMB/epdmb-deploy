import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { RegisterSellerDto } from 'src/sellers/sellers.dto';
import { LoginUserDto, RegisterUserDto } from 'src/users/users.dto';

export function SignUpUserSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registro de usuario',
      description:
        "Registra un usuario en el sistema con los datos requeridos en el RegisterUserDto, y se le asigna de forma automática el rol de 'user'.",
    }),
    ApiBody({
      description: 'Datos necesarios para registrar un usuario',
      type: RegisterUserDto,
    }),
    ApiResponse({ status: 201, description: 'Usuario creado correctamente' }),
    ApiResponse({ status: 400, description: 'Error al registrar el usuario' }),
  );
}

export function SignUpSellerSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registro de vendedor',
      description:
        "Registra un vendedor en el sistema con los datos requeridos en el SellerDto, y se le asigna de forma automática el rol de 'seller'.",
    }),
    ApiBody({
      description: 'Datos necesarios para registrar un vendedor',
      type: RegisterSellerDto,
    }),
    ApiResponse({ status: 201, description: 'Vendedor creado correctamente' }),
    ApiResponse({ status: 400, description: 'Error al registrar el vendedor' }),
  );
}

export function getAuthSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Verificación del email de usuario',
      description:
        'Al usuario le llega un correo a su email registrado, para que confirme el registro.',
    }),
    ApiResponse({ status: 200, description: 'Email verificado correctamente' }),
    ApiResponse({ status: 400, description: 'Error al verificar el email' }),
    ApiBadRequestResponse({
      status: 400,
      description: 'Error al verificar el email',
    }),
  );
}

export function SignInSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Iniciar sesión',
      description:
        'Inicia la sesión en el sistema con los datos requeridos en el LogginUserDto. Se le generará un token con el que podrá navegar por la aplicación dependiendo el rol que tenga.',
    }),
    ApiBody({
      description: 'Datos necesarios para iniciar sesión',
      type: LoginUserDto,
    }),
    ApiResponse({ status: 200, description: 'Sesión iniciada correctamente' }),
    ApiResponse({ status: 401, description: 'Credenciales inválidas' }),
    ApiResponse({ status: 400, description: 'Error al iniciar la sesión' }),
  );
}
