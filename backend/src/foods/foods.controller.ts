import { Body, Controller, Get, HttpException, Param, Post, Put, Scope } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { ImagesService } from 'src/images/images.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/roles.enum';
import { FoodDto } from './dto/food.dto';
import { ResponseData } from 'src/common/global/responde.data';
import { HttpMessage, HttpStatusCode } from 'src/common/enum/httpstatus.enum';
import { ImageDTO } from 'src/images/dto/image.dto';
import { Public } from 'src/common/decorator/public.decorator';

@Controller({
    path: 'foods',
    scope: Scope.REQUEST
})
@ApiTags('foods')
export class FoodsController {
    constructor(
        private readonly foodsService: FoodsService,
        private readonly imagesService: ImagesService,
        private readonly reviewsService: ReviewsService,
    ){}

    @Post()
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    async createFood(@Body() createFoodDTO: FoodDto): Promise<ResponseData<FoodDto>>{
        try{
            const food = await this.foodsService.createFood(createFoodDTO);
            if(food){
                return new ResponseData<FoodDto>(food, HttpStatusCode.CREATED, HttpMessage.CREATED);
            }
            return new ResponseData<FoodDto>(null, HttpStatusCode.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }catch(e){
            throw new HttpException(e.message, e.status);
        }
    }

    @Put(':id')
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    async updateFood(
        @Param('id') id: number,
        @Body() updateFoodDTO: FoodDto): Promise<ResponseData<FoodDto>>{
        try{
            const food = await this.foodsService.updateFood(id,updateFoodDTO);
            if(food){
                return new ResponseData<FoodDto>(food, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData<FoodDto>(null, HttpStatusCode.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }catch(e){
            throw new HttpException(e.message, e.status);
        }
    }

    @Put(':foodId/images/:imageId')
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    async updateImage(
        @Param('foodId') foodId: number,
        @Param('imageId') imageId: number,
        @Body() ImageDTO: ImageDTO){
        try{
            await this.imagesService.updateImage(imageId, foodId, ImageDTO);
        }catch(e){
            throw new HttpException(e.message, e.status);
        }
    }

    @Get(':foodId/reviews')
    @Public()
    async getReviews(@Param('foodId') foodId: number){
        try{
            const reviews = await this.reviewsService.getReviews(foodId);
            if(reviews){
                return new ResponseData(reviews, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData(null, HttpStatusCode.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }catch(e){
            throw new HttpException(e.message, e.status);
        }
    }

    @Get('all')
    @Public()
    async getAllFoods(){
        try{
            const foods = await this.foodsService.getFoods();
            if(foods){
                return new ResponseData(foods, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData(null, HttpStatusCode.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }catch(e){
            throw new HttpException(e.message, e.status);
        }
    }

    @Get('/popular/:limit')
    @Public()
    async getPopularFoods(@Param('limit') limit: number){
        try{
            const foods = await this.foodsService.getPopularFoods(limit);
            if(foods){
                return new ResponseData(foods, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData(null, HttpStatusCode.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }catch(e){
            throw new HttpException(e.message, e.status);
        }
    }

    @Get(':id')
    @Public()
    async getFood(@Param('id') id: number){
        try{
            const food = await this.foodsService.getFood(id);
            if(food){
                return new ResponseData(food, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData(null, HttpStatusCode.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }catch(e){
            throw new HttpException(e.message, e.status);
        }
    }

    @Get('category/:categoryId')
    @Public()
    async getFoodsByCategory(@Param('categoryId') categoryId: number){
        try{
            const foods = await this.foodsService.getFoodsByCategory(categoryId);
            if(foods){
                return new ResponseData(foods, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData(null, HttpStatusCode.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }catch(e){
            throw new HttpException(e.message, e.status);
        }
    }
    
}
