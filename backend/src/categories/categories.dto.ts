import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CategoryDto {
    @ApiProperty({
        description: "Nombre de la categoría.",
        type: "string",
        example: "smartphone"
    })
    @IsString()
    name: string
}