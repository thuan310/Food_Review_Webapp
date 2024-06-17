import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ViewDto {
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    id?: number;
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    @Expose({name: 'path_name'})
    pathName?: string;
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    count?: number;
}