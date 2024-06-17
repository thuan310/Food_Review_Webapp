import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FeedbackDto {
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    id?: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    @Expose({name : 'user_id'})
    userId?: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    email?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    name?: string;

    @IsDate()
    @IsOptional()
    @ApiPropertyOptional()
    date?: Date;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    message?: string;

    @IsBoolean()
    @IsOptional()
    @Expose({ name: 'is_user' })
    @ApiPropertyOptional()
    isUser?: boolean;
}