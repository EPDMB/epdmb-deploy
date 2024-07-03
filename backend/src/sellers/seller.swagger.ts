import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function registerFairSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Registrar una feria',
      description: 'Registra una feria en el sistema',
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
      summary: 'Verificación de vendedor',
      description: 'Actualiza el estado de verificación de un vendedor',
    }),
    ApiResponse({
      status: 200,
      description: 'Vendedor verificado correctamente',
    }),
    ApiResponse({ status: 400, description: 'Error al verificar el vendedor' }),
  );
}
