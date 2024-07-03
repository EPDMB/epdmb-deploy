import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

export function createCategorySwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: "Registrar una categoria",
            description: "Registra una categoria en el sistema",
        }),
        ApiResponse({
            status: 201,
            description: "Categoria registrada correctamente",
        }),
        ApiResponse({ status: 400, description: "Error al registrar la categoria" }),
    )
}

export function getCategoriesSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: "Obtener todas las categorias",
            description: "Obtiene todas las categorias en el sistema",
        }),
        ApiResponse({
            status: 200,
            description: "Categorias encontradas",
        }),
        ApiResponse({ status: 400, description: "Error al obtener las categorias" }),
    )
}

export function getCategoryByIdSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: "Obtener una categoria por su ID",
            description: "Obtiene una categoria por su ID en el sistema",
        }),
        ApiParam({
            name: "id",
            description: "ID de la categoria",
        }),
        ApiResponse({
            status: 200,
            description: "Categoria encontrada",
        }),
        ApiResponse({ status: 400, description: "Error al obtener la categoria" }),
    )
}