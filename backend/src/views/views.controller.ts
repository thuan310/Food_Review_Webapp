import { Body, Controller, Get, HttpException, Param, Post, Scope } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { ViewDto } from './dto/view.dto';
import { ResponseData } from 'src/common/global/responde.data';
import { HttpMessage, HttpStatusCode } from 'src/common/enum/httpstatus.enum';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/roles.enum';

@Controller({
    path: 'views',
    scope: Scope.REQUEST
})
@ApiTags('views')
export class ViewsController {
    constructor(
        private readonly viewsService: ViewsService
    ) {}

    @Post()
    @Public()
    async incrementViewCount(@Body() view: ViewDto): Promise<ResponseData<ViewDto>> {
        try{
            const result = await this.viewsService.incrementViewCount(view);
            if(result){
                return new ResponseData(result, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData(null, HttpStatusCode.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Get('all')
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    async getViews(): Promise<ResponseData<ViewDto[]>> {
        try{
            const result = await this.viewsService.getViews();
            if(result){
                return new ResponseData<ViewDto[]>(result, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData(null, HttpStatusCode.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Get(':limit')
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    async getTopViews(
        @Param('limit') limit: number
    ): Promise<ResponseData<ViewDto[]>> {
        try{
            const result = await this.viewsService.getTopViews(limit);
            if(result){
                return new ResponseData<ViewDto[]>(result, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData(null, HttpStatusCode.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Get(':pathName')
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    async getView(
        @Param('pathName') viewDto: ViewDto
    ): Promise<ResponseData<ViewDto>> {
        try{
            const result = await this.viewsService.getView(viewDto);
            if(result){
                return new ResponseData<ViewDto>(result, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData(null, HttpStatusCode.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
}
