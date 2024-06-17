import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entity/food.entity';
import { FoodsService } from './foods.service';
import { Category } from 'src/categories/entity/category.entity';
import { ReviewsService } from 'src/reviews/reviews.service';
import { CategoriesService } from 'src/categories/categories.service';
import { Review } from 'src/reviews/entity/review.entity';
import { ImagesService } from 'src/images/images.service';
import { Image } from 'src/images/entity/image.entity';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { Feedback } from 'src/feedbacks/entity/feedback.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food, Category, Image, Review, User, Feedback]),
  ],
  controllers: [FoodsController],
  providers: [FoodsService, ImagesService, ReviewsService, CategoriesService, UsersService],
  exports: [FoodsService, ImagesService, ReviewsService, CategoriesService, UsersService],
})
export class FoodsModule {}
