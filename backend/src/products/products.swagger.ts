import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ProductsDto } from './dtos/products.dto';

export function createProductsSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Subir productos a la feria',
      description:
        'Registra un producto en el sistema con los datos requeridos en el ProductDto',
    }),
    ApiBody({
      description: 'Datos necesarios para registrar un producto',
      type: ProductsDto,
    }),
    ApiParam({
      name: 'sellerId',
      description: 'id del vendedor',
    }),
    ApiParam({
      name: 'fairId',
      description: 'id de la feria',
    }),
    ApiResponse({ status: 201, description: 'producto creado correctamente' }),
    ApiResponse({ status: 400, description: 'Error al registrar el proyecto' }),
  );
}

export function getAllProductsSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener todos los productos',
      description: 'Obtiene todos los productos registrados en el sistema',
    }),
    ApiResponse({ status: 200, description: 'producto encontrados' }),
    ApiResponse({ status: 400, description: 'Error al obtener los productos' }),
  );
}

export function updateStatusSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Actualizar el estado de un producto',
      description: 'Actualiza el estado de un producto en el sistema',
    }),
    ApiParam({
      name: 'id',
      description: 'ID del producto',
    }),
    ApiBody({
      description: 'Datos necesarios para actualizar el estado del proyecto',
      type: ProductsDto,
    }),
    ApiResponse({
      status: 200,
      description: 'producto actualizado correctamente',
    }),
    ApiResponse({
      status: 400,
      description: 'Error al actualizar el producto',
    }),
  );
}
