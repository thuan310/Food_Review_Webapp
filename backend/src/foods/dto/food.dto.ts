import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CategoryDTO } from "src/categories/dto/category.dto";
import { ImageDTO } from "src/images/dto/image.dto";

export class FoodDto {
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    id: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    name: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    price: number;
    
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CategoryDTO)
    @ApiPropertyOptional({ type: [CategoryDTO] })
    categories: CategoryDTO[];

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ImageDTO)
    @ApiPropertyOptional({ type: [ImageDTO] })
    images: ImageDTO[];
}