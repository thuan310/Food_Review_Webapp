import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class OriginDto{
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    id: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    @Expose({name: 'origin_name'})
    originalName: string;
}