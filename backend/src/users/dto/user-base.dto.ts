import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UserBase {
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    username: string;

    @IsString()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    role: string;
}