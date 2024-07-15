import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { RegisterSellerDto } from '../sellers/sellers.dto';
import { LoginUserDto, RegisterUserDto, ResetPasswordDto } from '../users/users.dto';

export function getWithGooleSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registro y logueo de usuario con Google',
      description:
        'El usuario se registra y se loguea automáticamente con Google, no se prueba con swagger',
    }),
    ApiResponse({
      status: 200,
      description: 'Usuario verificado correctamente',
    }),
    ApiResponse({ status: 400, description: 'Error al verificar el usuaro' }),
    ApiBadRequestResponse({
      status: 400,
      description: 'Error al verificar el email',
    }),
  );
}

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

export function forgotPasswordSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Olvidé mi contraseña (1er paso)',
      description: 'Al selecciónar "olvide mi contraseña" se envía un correo electrónico con instrucciones para restablecer la contraseña, se envía en el cuerpo de la solicitud el mail para la recuperación.',
    }),
    ApiBody({
      schema: { example: { email: 'example@example.com' } },
    }),
    ApiResponse({ status: 200, description: 'Correo electrónico enviado correctamente' }),
    ApiResponse({ status: 400, description: 'Error al enviar el correo electrónico' }),
  );
}

export function resetPasswordSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Restablecer contraseña (2do paso)',
      description: 'En el mail, seleccionar "restalecer contraseña", esto te redirige al formulario para ingresar tu nueva contraseña y la confirmación.',
    }),
    ApiBody({
      type: ResetPasswordDto,
      schema: { example: { password: 'QueOnditaMiPandita123456', confirmPassword: 'QueOnditaMiPandita123456' } },
    }),
    ApiResponse({ status: 200, description: 'Contraseña restablecida correctamente' }),
    ApiResponse({ status: 400, description: 'Error al restablecer la contraseña' }),
  );
}

export function getProtectedSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Protección de la ruta del inicio de Google', description: 'Ruta de protección de Google' }),
    ApiResponse({ status: 200, description: 'Token verificado correctamente' }),
    ApiResponse({ status: 401, description: 'Token inválido' }),
  );
}
