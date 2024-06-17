import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { Category } from './entity/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { Food } from 'src/foods/entity/food.entity';
import { Review } from 'src/reviews/entity/review.entity';
import { User } from 'src/users/entity/user.entity';
import { Image } from 'src/images/entity/image.entity';
import { Feedback } from 'src/feedbacks/entity/feedback.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food, Category, Image, Review, User, Feedback]),
],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
