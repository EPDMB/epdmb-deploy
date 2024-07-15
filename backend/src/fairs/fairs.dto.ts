import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsDate, IsNumber, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDto } from 'src/categories/categories.dto';

export class FairCategoryDto {
  @IsNumber()
  maxProductsSeller: number;

  @IsNumber()
  minProductsSeller: number;

  @IsNumber()
  maxProducts: number;

  @IsNumber()
  maxSellers: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  category: CategoryDto[];
}

export class FairDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  entryPriceSeller: number;

  @IsNumber()
  entryPriceBuyer: number;

  @IsString()
  @IsNotEmpty()
  entryDescription: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FairCategoryDto)
  fairCategories: FairCategoryDto[];

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsNumber()
  timeSlotInterval: number;

  @IsNumber()
  capacityPerTimeSlot: number;
}

