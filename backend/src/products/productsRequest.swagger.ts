import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { CreateProductRequestDto } from "./dtos/createProductRequest.dto";
import { UpdateProductRequestDto } from "./dtos/updateProductRequest.dto";

export function createProductRequestSwagger() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Registrar una solicitud de productos',
            description: 'Registra una solicitud de productos en el sistema',
        }),
        ApiBody({
            description: 'Datos necesarios para registrar una solicitud de productos',
            type: CreateProductRequestDto,
        }),
        ApiResponse({
            status: 201,
            description: 'Solicitud enviada correctamente',
        }),
        ApiResponse({ status: 400, description: 'Error al enviar la solicitud' }),
    );
}

export function updateStatusProductRequestSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Actualizar el estado de una solicitud. Solo los usuarios logueados como administradores van a poder realizar la operación',
            description: 'Actualiza el estado de una solicitud en el sistema',
        }),
        ApiParam({
            name: 'id',
            description: 'ID de la solicitud',
        }),
        ApiBody({
            description: 'Datos necesarios para actualizar el estado de una solicitud',
            type: UpdateProductRequestDto,
        }),
        ApiResponse({
            status: 200,
            description: 'Producto actualizado correctamente',
        }),
        ApiResponse({ status: 400, description: 'Error al actualizar el producto' }),
    )
}

export function getAllProductsRequestSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Obtener todas las solicitudes de productos',
            description: 'Obtiene todas las solicitudes de productos registradas en el sistema. Solo los administradores pueden realizar la operación',
        }),
        ApiResponse({
            status: 200,
            description: 'Solicitudes encontradas',
        }),
        ApiResponse({ status: 400, description: 'Error al obtener las solicitudes' }),
    )
}

export function getProductsSellerSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Obtener todos los productos de un vendedor en particular.',
            description: 'Obtiene todos los productos de un vendedor en el sistema',
        }),
        ApiParam({
            name: 'id',
            description: 'ID del vendedor',
        }),
        ApiResponse({
            status: 200,
            description: 'Productos del vendedor',
        }),
        ApiResponse({ status: 400, description: 'Error al obtener los productos del vendedor' }),
    )
}