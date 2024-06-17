import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entity/image.entity';
import { ImagesService } from './images.service';
import { Food } from 'src/foods/entity/food.entity';
import { Category } from 'src/categories/entity/category.entity';
import { Review } from 'src/reviews/entity/review.entity';
import { User } from 'src/users/entity/user.entity';
import { FoodsService } from 'src/foods/foods.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersService } from 'src/users/users.service';
import { Feedback } from 'src/feedbacks/entity/feedback.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food, Category, Image, Review, User, Feedback]),
  ],
  controllers: [ImagesController],
  providers: [FoodsService, ImagesService, ReviewsService, CategoriesService, UsersService],
  exports: [FoodsService, ImagesService, ReviewsService, CategoriesService, UsersService],
})
export class ImagesModule {}
