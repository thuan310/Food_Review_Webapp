import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ReviewDto{
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    id?: number

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    userId?: number

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    username?: string

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    foodId?: number

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    rating?: number

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    comment?: string
}