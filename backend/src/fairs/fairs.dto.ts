import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class FairDto {

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(25)
    @IsString()
    @ApiProperty({
        description: 'Coloque el nombre de la feria',
        example: 'Feriacity',
    })
    name: string;
    
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(25)
    @IsString()
    @ApiProperty({
        description: 'Coloque la direccion de la feria',
        example: 'Calle falsa 123',
    })
    address: string;
    
    @IsNotEmpty()
    @IsDate()
    @ApiProperty({
        description: 'Coloque la fecha de inicio',
        example: '2022-01-01',
    })
    startDate: Date;
    
    @IsNotEmpty()
    @IsDate()
    @ApiProperty({
        description: 'Coloque la fecha de fin',
        example: '2022-01-02',
    })
    endDate: Date;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: 'Coloque la entrada',
        example: '100',
    })
    entryFee: number;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Coloque la descripción de la entrada',
        example: 'Entrada gratis',
    })
    entryFeeDescription: string;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: 'Coloque el maximo de vendedores',
        example: '10',
    })
    maxSellers: number;

}