import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { FairDto } from "./fairs.dto";

export function CreateFairsSwagger() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: "Crear una Feria",
            description: "Registra una feria en el sistema con los datos requeridos en el FairDto, unicamente los administradores tienen acceso a esta operación",
        }),
        ApiBody({
            description: "Datos necesarios para registrar una feria",
            type: FairDto,
        }),
        ApiResponse({ status: 201, description: "Feria creada correctamente" }),
        ApiResponse({ status: 400, description: "Error al registrar la feria" }),
    );
}

export function getFairsSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: "Obtener todas las ferias",
            description: "Obtiene todas las ferias registradas en el sistema",
        }),
        ApiResponse({ status: 200, description: "Ferias encontradas" }),
        ApiResponse({ status: 400, description: "Error al obtener las ferias" }),
    );
}

export function updateFairSwagger() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: "Actualizar una Feria",
            description: "Actualiza una feria en el sistema con los datos requeridos en el FairDto, unicamente los administradores tienen acceso a esta operación",
        }),
        ApiBody({
            description: "Datos necesarios para actualizar una feria",
            type: FairDto,
        }),
        ApiParam({
            name: "id",
            description: "ID de la feria",
        }),
        ApiResponse({ status: 200, description: "Feria actualizada correctamente" }),
        ApiResponse({ status: 400, description: "Error al actualizar la feria" }),
    );
}

export function deleteFairSwagger() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: "Eliminar una Feria",
            description: "Elimina una feria del sistema, unicamente los administradores tienen acceso a esta operación",
        }),
        ApiParam({
            name: "id",
            description: "ID de la feria",
        }),
        ApiResponse({ status: 200, description: "Feria eliminada correctamente" }),
        ApiResponse({ status: 400, description: "Error al eliminar la feria" }),
    );
}

export function getFairByIdSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: "Obtener una feria por su ID",
            description: "Obtiene una feria por su ID en el sistema",
        }),
        ApiParam({
            name: "id",
            description: "ID de la feria",
        }),
        ApiResponse({ status: 200, description: "Feria encontrada" }),
        ApiResponse({ status: 400, description: "Error al obtener la feria" }),
    );
}

export function closeFairSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: "Cierre de una feria",
            description: "Cierra una feria en el sistema, unicamente los administradores tienen acceso a esta operación",
        }),
        ApiParam({
            name: "id",
            description: "ID de la feria",
        }),
        ApiResponse({ status: 200, description: "Feria cerrada correctamente" }),
        ApiResponse({ status: 400, description: "Error al cerrar la feria" }),
    )
}











