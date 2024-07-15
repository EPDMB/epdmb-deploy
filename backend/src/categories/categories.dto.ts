import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {
    @ApiProperty({
        description: "Nombre de la categoría.",
        type: "string",
        example: "0-12 mujer"
    })
    @IsString()
    @IsNotEmpty()
    name: string
}