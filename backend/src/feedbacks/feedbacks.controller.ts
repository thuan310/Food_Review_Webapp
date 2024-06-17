import { Body, Controller, Delete, Get, HttpException, Param, Post, Scope } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FeedbacksService } from './feedbacks.service';
import { Public } from 'src/common/decorator/public.decorator';
import { FeedbackDto } from './dto/feedback.dto';
import { ResponseData } from 'src/common/global/responde.data';
import { HttpMessage, HttpStatusCode } from 'src/common/enum/httpstatus.enum';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/roles.enum';

@Controller({
    path: 'feedbacks',
    scope: Scope.REQUEST,
})
@ApiTags('feedbacks')
export class FeedbacksController {
    constructor(
        private readonly feedbacksService: FeedbacksService,
    ) {}

    @Post()
    @Public()
    async createFeedback(
        @Body() feedback: FeedbackDto
    ): Promise<ResponseData<FeedbackDto>> {
        try {
            const result = await this.feedbacksService.createFeedback(feedback);
            if (result){
                return new ResponseData(result, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData(null, HttpStatusCode.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @Get('all')
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    async getFeedbacks(): Promise<ResponseData<FeedbackDto[]>> {
        try {
            const result = await this.feedbacksService.getFeedbacks();
            if (result){
                return new ResponseData<FeedbackDto[]>(result, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData(null, HttpStatusCode.NOT_FOUND, HttpMessage.NOT_FOUND);
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @Get(':id')
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    async getFeedback(
        @Param('id') id: number
    ): Promise<ResponseData<FeedbackDto>> {
        try {
            const result = await this.feedbacksService.getFeedback(id);
            if (result){
                return new ResponseData(result, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData(null, HttpStatusCode.NOT_FOUND, HttpMessage.NOT_FOUND);
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    async deleteFeedback(
        @Param('id') id: number
    ): Promise<ResponseData<string>> {
        try {
            const result = await this.feedbacksService.deleteFeedback(id);
            if (result){
                return new ResponseData('true', HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData('false', HttpStatusCode.NOT_FOUND, HttpMessage.NOT_FOUND);
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }
}
