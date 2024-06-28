import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

export function updateImageSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Actualizar imagen de usuario',
            description: 'Actualiza la imagen de usuario'
        }),
        ApiConsumes('multipart/form-data'),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                  file: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
        }),
        ApiParam({
            name: 'id',
            description: 'User ID',
            type: 'string',
          }),
        ApiResponse({ status: 200, description: 'Imagen actualizada correctamente' }),
        ApiResponse({ status: 400, description: 'Error al actualizar la imagen' })
)}

