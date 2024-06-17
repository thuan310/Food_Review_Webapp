import { Module } from '@nestjs/common';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entity/feedback.entity';
import { Food } from 'src/foods/entity/food.entity';
import { Category } from 'src/categories/entity/category.entity';
import { Review } from 'src/reviews/entity/review.entity';
import { User } from 'src/users/entity/user.entity';
import { Image } from 'src/images/entity/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food, Category, Image, Review, User, Feedback]),
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService]
})
export class FeedbacksModule {}
