import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function getSellersSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener todos los vendedores',
      description: 'Obtiene todos los vendedores registrados en el sistema, unicamente los administradores tienen acceso a esta operación',
    }),
    ApiResponse({
      status: 200,
      description: 'Vendedores encontradas',
    }),
    ApiResponse({ status: 400, description: 'Error al obtener los vendedores' }),
  );
}

export function registerFairSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Registrar vendedor a una feria',
      description: 'Registra un vendedore a una feria en el sistema',
    }),
    ApiParam({
      name: "sellerId",
      description: "ID del vendedor",
    }),
    ApiParam({
      name: "fairId",
      description: "ID de la feria",
    }),
    ApiParam({
      name: "categoryId",
      description: "ID de la categoria",
    }),
    ApiResponse({
      status: 201,
      description: 'Feria registrada correctamente',
    }),
    ApiResponse({ status: 400, description: 'Error al registrar la feria' }),
  );
}

export function updateIsVerifySellerSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Rechazar al vendedor',
      description: 'Actualiza el estado de verificación de un vendedor para rechazarlo, pasarlo de ACTIVE a NO_ACTIVE, unicamente los administradores tienen acceso a esta operación',
    }),
    ApiParam({
      name: "sellerId",
      description: "ID del vendedor",
    }),
    ApiResponse({
      status: 200,
      description: 'Vendedor rechazado correctamente',
    }),
    ApiResponse({ status: 400, description: 'Error al rechazar el vendedor' }),
  );
}

export function activateSellerSwagger(){
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Activar al vendedor',
      description: 'Actualiza el estado de verificación de un vendedor para activarlo, pasarlo de NO_ACTIVE a ACTIVE, unicamente los administradores tienen acceso a esta operación',
    }),
    ApiParam({
      name: "sellerId",
      description: "ID del vendedor",
    }),
    ApiResponse({
      status: 200,
      description: 'Vendedor activado correctamente',
    }),
    ApiResponse({ status: 400, description: 'Error al activar el vendedor' }),
  )
}

export function getSellerByIdSwagger(){
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener un vendedor',
      description: 'Obtiene un vendedor en el sistema',
    }),
    ApiParam({
      name: "sellerId",
      description: "ID del vendedor",
    }),
    ApiResponse({
      status: 200,
      description: 'Vendedor encontrado',
    }),
    ApiResponse({ status: 400, description: 'Error al obtener el vendedor' }),
)}

export function sellerToAdminSwagger(){
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Convertir un vendedor en administrador',
      description: 'Convierte un vendedor en administrador en el sistema, unicamente los administradores tienen acceso a esta operación',
    }),
    ApiParam({
      name: "sellerId",
      description: "ID del vendedor",
    }),
    ApiResponse({
      status: 200,
      description: 'Vendedor convertido correctamente en administrador',
    }),
    ApiResponse({ status: 400, description: 'Error al convertir el vendedor' }),
  )
}

export function adminToSellerSwagger(){
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
      description: 'Administrador convertido correctamente en vendedor',
    }),
    ApiResponse({ status: 400, description: 'Error al convertir el usuario' }),
  )
}