import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CategoryDTO {
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
    colorCode?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    tag?: string;
}