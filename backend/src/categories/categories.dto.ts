import { ApiProperty } from "@nestjs/swagger";
import {  IsNumber, IsString } from "class-validator";

export class CategoryDto {
    @ApiProperty({
        description: "Nombre de la categoría.",
        type: "string",
        example: "0-12 mujer"
    })
    @IsString()
    name: string
}