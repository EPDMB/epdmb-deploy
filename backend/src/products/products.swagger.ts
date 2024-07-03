import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function createProductsSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Subir productos a la feria',
      description:
        'Registra un proyecto en el sistema con los datos requeridos en el ProductDto',
    }),
    ApiResponse({ status: 201, description: 'Proyecto creado correctamente' }),
    ApiResponse({ status: 400, description: 'Error al registrar el proyecto' }),
  );
}

export function getAllProductsSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener todos los proyectos',
      description: 'Obtiene todos los proyectos registrados en el sistema',
    }),
    ApiResponse({ status: 200, description: 'Proyectos encontrados' }),
    ApiResponse({ status: 400, description: 'Error al obtener los proyectos' }),
  );
}

export function updateStatusSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Actualizar el estado de un proyecto',
      description: 'Actualiza el estado de un proyecto en el sistema',
    }),
    ApiResponse({
      status: 200,
      description: 'Proyecto actualizado correctamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Error al actualizar el proyecto',
    }),
  );
}
