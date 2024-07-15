import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { RegisterUserDto, RegisterUserFairDto, UpdatePasswordDto } from './users.dto';
import { Role } from './roles/roles.enum';

export function getAllUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener todos los usuarios',
      description:
        'Unicamente los usuarios logueados como ADMIN obtiene todos los usuarios registrados en el sistema',
    }),
    ApiResponse({
      status: 200,
      description: 'Todos los usuarios encontrados',
    }),
    ApiResponse({
      status: 400,
      description: 'Error al obtener los usuarios',
    }),
  );
}

export function getUserByEmailAndDniSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener un usuario por su correo y dni',
      description: 'Obtiene un usuario por su correo y dni en el sistema',
    }),
    ApiResponse({ status: 200, description: 'Usuario encontrado' }),
    ApiResponse({ status: 400, description: 'Error al obtener el usuario' }),
  );
}

export function updatePasswordSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Actualizar la contraseña de un usuario desde el perfil',
      description: 'Actualiza la contraseña de un usuario en el sistema desde el perfil, debe colocar su contraseña anterior, nueva y confirmarla',
    }),
    ApiBody({
      description: 'Datos necesarios para modificar la contraseña',
      type: UpdatePasswordDto,
    }),
    ApiParam({
      name: 'id',
      description: 'ID del usuario',
    }),
    ApiResponse({
      status: 201,
      description: 'Contraseña modificada correctamente',
    }),
    ApiResponse({ status: 400, description: 'Error al cambiar la contraseña' }),
  );
}

export function registerUserFairSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Inscripción de un usuario en una feria',
      description: 'Registra un usuario en una feria',
    }),
    ApiBody({
      description: 'Datos necesarios para registrar un usuario en una feria, fecha y horario elegido según cupo disponible',	
      type: RegisterUserFairDto,
    }),
    ApiParam({
      name: 'userId',
      description: 'ID del usuario',
    }),
    ApiParam({
      name: 'fairId',
      description: 'ID de la feria',
    }),
    ApiResponse({ status: 201, description: 'Usuario creado correctamente' }),
    ApiResponse({ status: 400, description: 'Error al registrar el usuario' }),
  );
}

export function getUserByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener un usuario por su ID',
      description: 'Obtiene un usuario por su ID en el sistema',
    }),
    ApiParam({
      name: 'id',
      description: 'ID del usuario',
    }),
    ApiResponse({ status: 200, description: 'Usuario encontrado' }),
    ApiResponse({ status: 400, description: 'Error al obtener el usuario' }),
  );
}

export function userToSellerSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Convertir un usuario en vendedor',
      description: 'Convierte un usuario en vendedor en el sistema, unicamente los administradores tienen acceso a esta operación',
    }),
    ApiParam({
      name: 'id',
      description: 'ID del usuario',
    }),
    ApiBody({
      description: 'Datos necesarios para convertir un usuario en vendedor',
      enum: Role,
    }),
    ApiResponse({
      status: 201,
      description: 'Usuario convertido correctamente',
    }),
    ApiResponse({ status: 400, description: 'Error al convertir el usuario' }),
  );
}

export function updateUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Actualizar un usuario',
      description: 'Actualiza un usuario en el sistema, el usuario puede actualizar sus datos en el perfil',
    }),
    ApiBody({
      description: 'Datos necesarios para modificar el usuario',
      type: RegisterUserDto,
    }),
    ApiParam({
      name: 'id',
      description: 'ID del usuario',
    }),
    ApiResponse({
      status: 200,
      description: 'Usuario actualizado correctamente',
    }),
    ApiResponse({ status: 400, description: 'Error al actualizar el usuario' }),
  );
}

export function blockUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Bloquear un usuario',
      description: 'Bloquear un usuario en el sistema, unicamente los administradores tienen acceso a esta operación',
    }),
    ApiParam({
      name: 'id',
      description: 'ID del usuario',
    }),
    ApiResponse({
      status: 200,
      description: 'Usuario bloqueado correctamente',
    }),
    ApiResponse({ status: 400, description: 'Error al bloquear el usuario' }),
  );
}

export function unblockUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Desbloquear un usuario',
      description: 'Desbloquear un usuario en el sistema, unicamente los administradores tienen acceso a esta operación',
    }),
    ApiParam({
      name: 'id',
      description: 'ID del usuario',
    }),
    ApiResponse({
      status: 200,
      description: 'Usuario desbloqueado correctamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Error al desbloquear el usuario',
    }),
  );
}

export function userToAdminSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Convertir un usuario en administrador',
      description: 'Convierte un usuario en administrador en el sistema, unicamente los administradores tienen acceso a esta operación',
    }),
    ApiParam({
      name: 'id',
      description: 'ID del usuario',
    }),
    ApiResponse({
      status: 200,
      description: 'Usuario convertido correctamente',
    }),
    ApiResponse({ status: 400, description: 'Error al convertir el usuario' }),
  );
}

export function adminToUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Convertir un administrador en usuario',
      description: 'Convierte un administrador en usuario en el sistema, unicamente los administradores tienen acceso a esta operación',
    }),
    ApiParam({
      name: 'id',
      description: 'ID del administrador',
    }),
    ApiResponse({
      status: 200,
      description: 'Usuario convertido correctamente',
    }),
    ApiResponse({ status: 400, description: 'Error al convertir el usuario' }),
  );
}
