import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entity/review.entity';
import { Food } from 'src/foods/entity/food.entity';
import { ReviewDto } from './dto/review.dto';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entity/user.entity';
import { ReviewBaseDto } from './dto/review-base.dto';
import { FoodsService } from 'src/foods/foods.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
        @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly foodService: FoodsService,
        private readonly userService: UsersService,
    ) {}

    reviewBase(food: Food, user: User, review: Review): ReviewBaseDto {
        const reviewBase = new ReviewBaseDto();
        if(food){
            reviewBase.food = this.foodService.foodBase(food);
        }
        if(user){
            reviewBase.user = this.userService.userBase(user);
        }
        let reviewDto = new ReviewDto();
        reviewDto.id = review.id;
        reviewDto.rating = review.rating;
        reviewDto.comment = review.comment;
        reviewBase.review = reviewDto;
        return reviewBase;
    }

    async getReviews(foodId: number): Promise<ReviewDto[]> {
        const food = await this.foodRepository.findOne(
            {
                where: { id: foodId },
                relations: ['reviews'],
            }
        )
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        if(!food.reviews) {
            return [];
        }
        const reviews: ReviewDto[] = [];
        food.reviews.map(review => {
            reviews.push({
                id: review.id,
                userId: review.user.id,
                username: review.user.username,
                foodId: review.food.id,
                rating: review.rating,
                comment: review.comment,
            })
        });
        return reviews;
    }

    async createReview(foodId: number, reviewDto: ReviewDto): Promise<ReviewBaseDto> {
        const food = await this.foodRepository.findOne(
            {
                where: { id: foodId },
                relations: ['reviews'],
            }
        )
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        const user = await this.userRepository.findOne({
            where: { id: reviewDto.userId },
        })
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        if (food.reviews.find(review => review.user.id === reviewDto.userId)){
            throw new HttpException('User has already reviewed this food', HttpStatus.BAD_REQUEST);
        }
        if (reviewDto.rating < 1 || reviewDto.rating > 5) {
            throw new HttpException('Rating must be between 1 and 5', HttpStatus.BAD_REQUEST);  
        }
        
        let review = plainToClass(Review, reviewDto);
        review = await this.reviewRepository.save(review);
        review.food = food;
        review.user = user;
        await this.reviewRepository.save(review);
        return this.reviewBase(food, user, review);
    }

    async deleteReview(foodId: number, userId: number): Promise<boolean> {
        const food = await this.foodRepository.findOne(
            {
                where: { id: foodId },
                relations: ['reviews'],
            }
        )
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        const review = food.reviews.find(review => review.user.id === userId);
        if (!review) {
            throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
        }
        review.food = null;
        review.user = null;
        review.deletedAt = new Date();
        await this.reviewRepository.save(review);
        return true;
    }

    async updateReview(foodId: number, userId: number, reviewDto: ReviewDto): Promise<ReviewDto> {
        const food = await this.foodRepository.findOne(
            {
                where: { id: foodId },
                relations: ['reviews'],
            }
        )
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        const review = food.reviews.find(review => review.user.id === userId);
        if (!review) {
            throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
        }
        if (reviewDto.rating < 1 || reviewDto.rating > 5) {
            throw new HttpException('Rating must be between 1 and 5', HttpStatus.BAD_REQUEST);  
        }
        if (reviewDto.comment) {
            review.comment = reviewDto.comment;
        }
        if (reviewDto.rating) {
            review.rating = reviewDto.rating;
        }
        await this.reviewRepository.save(review);
        return plainToClass(ReviewDto, review);
    }

    async getReview(reviewId: number): Promise<ReviewBaseDto> {
        const review = await this.reviewRepository.findOne(
            {
                where: { id: reviewId },
                relations: ['food', 'user'],
            }
        )
        if (!review) {
            throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
        }
        const food = await this.foodRepository.findOne(
            {
                where: { id: review.food.id },
                relations: ['reviews'],
            }
        );
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        return this.reviewBase(food, review.user, review);
    }
    
    async calculateAverageRating(foodId: number): Promise<number> {
        const food = await this.foodRepository.findOne(
            {
                where: { id: foodId },
                relations: ['reviews'],
            }
        )
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        if(!food.reviews) {
            return 0;
        }
        const totalRating = food.reviews.reduce((acc, review) => acc + review.rating, 0);
        const averrageRating = food.reviews.length ? totalRating / food.reviews.length : 0;
        return averrageRating;
    }
}
