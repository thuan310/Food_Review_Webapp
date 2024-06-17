import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class IngredientDTO{
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    id: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    @Expose({name: 'ingredient_name'})
    ingredientName: string;
}