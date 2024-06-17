import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entity/review.entity';
import { ReviewsService } from './reviews.service';
import { Food } from 'src/foods/entity/food.entity';
import { FoodsService } from 'src/foods/foods.service';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { Category } from 'src/categories/entity/category.entity';
import { Image } from 'src/images/entity/image.entity';
import { ImagesService } from 'src/images/images.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { Feedback } from 'src/feedbacks/entity/feedback.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food, Category, Image, Review, User, Feedback]),
  ],
  controllers: [ReviewsController],
  providers: [FoodsService, ReviewsService, UsersService, ImagesService, CategoriesModule],
  exports: [FoodsService, ReviewsService, UsersService, ImagesService, CategoriesModule],
})
export class ReviewsModule {}

