import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsObject, IsOptional } from "class-validator";
import { FoodBaseDto } from "src/foods/dto/food-base.dto";
import { UserBase } from "src/users/dto/user-base.dto";
import { ReviewDto } from "./review.dto";

export class ReviewBaseDto {
    @IsObject()
    @IsOptional()
    @ApiPropertyOptional()
    user: UserBase;

    @IsObject()
    @IsOptional()
    @ApiPropertyOptional()
    food: FoodBaseDto;

    @IsObject()
    @IsOptional()
    @ApiPropertyOptional()
    review: ReviewDto;

}