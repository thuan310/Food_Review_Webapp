import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entity/feedback.entity';
import { Repository } from 'typeorm';
import { FeedbackDto } from './dto/feedback.dto';
import { User } from 'src/users/entity/user.entity';
import { HttpStatusCode } from 'src/common/enum/httpstatus.enum';

@Injectable()
export class FeedbacksService {
    constructor(
        @InjectRepository(Feedback) private readonly feedbackRepository: Repository<Feedback>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async createFeedback(feedback: FeedbackDto): Promise<FeedbackDto> {
        let f = new Feedback();
        f.email = feedback.email;
        f.name = feedback.name;
        if (feedback.date) {
            f.date = feedback.date;
        } else {
            f.date = new Date();
            feedback.date = f.date;
        }
        f.message = feedback.message;
        if (feedback.userId) {
            const user = await this.userRepository.findOne({
                where: { id: feedback.userId }
            });
            if (!user) {
                f.isUser = false;
                feedback.isUser = false;
            }
            f.isUser = true;
            feedback.isUser = true;
        }
        f = await this.feedbackRepository.save(f);
        feedback.id = f.id;
        return feedback;
    }

    async getFeedbacks(): Promise<FeedbackDto[]> {
        const feedbacks = await this.feedbackRepository.find();
        if (!feedbacks) {
            throw new HttpException('Feedbacks not found', HttpStatusCode.NOT_FOUND);
        }
        return feedbacks.map(f => {
            const feedback = new FeedbackDto();
            feedback.id = f.id;
            feedback.email = f.email;
            feedback.name = f.name;
            feedback.date = f.date;
            feedback.message = f.message;
            feedback.isUser = f.isUser;
            return feedback;
        });
    }

    async getFeedback(id: number): Promise<FeedbackDto> {
        const f = await this.feedbackRepository.findOne({
            where: { id }
        });
        if (!f) {
            throw new HttpException('Feedback not found', HttpStatusCode.NOT_FOUND);
        }
        const feedback = new FeedbackDto();
        feedback.id = f.id;
        feedback.email = f.email;
        feedback.name = f.name;
        feedback.date = f.date;
        feedback.message = f.message;
        feedback.isUser = f.isUser;
        return feedback;
    }

    async deleteFeedback(id: number): Promise<boolean> {
        const feedback = await this.feedbackRepository.findOne({
            where: { id }
        });
        if (!feedback) {
            throw new HttpException('Feedback not found', HttpStatusCode.NOT_FOUND);
        }
        feedback.deletedAt = new Date();
        await this.feedbackRepository.save(feedback);
        return true;
    }


}
