import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class ImageDTO {
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    id: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    url: string;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    @Expose({name: 'is_main'})
    @Transform(({ value }) => value !== undefined ? value : 'false')
    isMain: boolean;
}