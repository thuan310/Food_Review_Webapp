import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { CategoryDTO } from "src/categories/dto/category.dto";
import { IngredientDTO } from "src/categories/dto/ingredient.dto";
import { OriginDto } from "src/categories/dto/origin.dto";
import { ImageDTO } from "src/images/dto/image.dto";
import { ReviewDto } from "src/reviews/dto/review.dto";

export class FoodBaseDto {
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    id?: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    name?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    price?: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    rating?: number;
    
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CategoryDTO)
    @ApiPropertyOptional({ type: [CategoryDTO] })
    categories?: CategoryDTO[];

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ImageDTO)
    @ApiPropertyOptional({ type: [ImageDTO] })
    images?: ImageDTO[];

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientDTO)
    @ApiPropertyOptional({ type: [IngredientDTO] })
    ingredients?: IngredientDTO[];

    @IsObject()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => OriginDto)
    @ApiPropertyOptional({ type: OriginDto })
    origin?: OriginDto;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ReviewDto)
    @ApiPropertyOptional({ type: ReviewDto })
    reviews?: ReviewDto[];
}