import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FairDto } from "./fairs.dto";

export function CreateFairsSwagger() {
    return applyDecorators(
        ApiTags('Fairs'),
        ApiOperation({
            summary: "Crear una Feria",
            description: "Registra una feria en el sistema con los datos requeridos en el FairDto",
        }),
        ApiBody({
            description: "Datos necesarios para registrar una feria",
            type: FairDto,
        }),
        ApiResponse({ status: 201, description: "Feria creada correctamente" }),
        ApiResponse({ status: 400, description: "Error al registrar la feria" }),
    );
}