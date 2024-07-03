import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdatePasswordDto } from './users.dto';

export function getAllUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener todos los usuarios',
      description: 'Unicamente los usuarios logueados como ADMIN obtiene todos los usuarios registrados en el sistema',
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

export function registerUserFairSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: "Inscripción de un usuario en una feria",
            description: "Registra un usuario en una feria",
        }),
        ApiResponse({ status: 201, description: "Usuario creado correctamente" }),
        ApiResponse({ status: 400, description: "Error al registrar el usuario" }),
    )
}

export function getUserByIdSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: "Obtener un usuario por su ID",
            description: "Obtiene un usuario por su ID en el sistema",
        }),
        ApiParam({
            name: "id",
            description: "ID del usuario",
        }),
        ApiResponse({ status: 200, description: "Usuario encontrado" }),
        ApiResponse({ status: 400, description: "Error al obtener el usuario" }),
    )
}

export function updateUserSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: "Actualizar un usuario",
            description: "Actualiza un usuario en el sistema",
        }),
        ApiParam({
            name: "id",
            description: "ID del usuario",
        }),
        ApiResponse({ status: 200, description: "Usuario actualizado correctamente" }),
        ApiResponse({ status: 400, description: "Error al actualizar el usuario" }),
    )
}

export function deleteUserSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: "Eliminar un usuario",
            description: "Elimina un usuario del sistema",
        }),
        ApiParam({
            name: "id",
            description: "ID del usuario",
        }),
        ApiResponse({ status: 200, description: "Usuario eliminado correctamente" }),
        ApiResponse({ status: 400, description: "Error al eliminar el usuario" }),
    )
}

export function updatePasswordSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: "Actualizar la contraseña de un usuario",
            description: "Actualiza la contraseña de un usuario en el sistema",
        }),
        ApiBody({
            description: 'Datos necesarios para modificar la contraseña',
            type: UpdatePasswordDto,
          }),
        ApiResponse({ status: 201, description: "Contraseña modificada correctamente" }),
        ApiResponse({ status: 400, description: "Error al cambiar la contraseña" }),
    )
}
