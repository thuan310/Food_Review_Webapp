import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Scope } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/roles.enum';
import { ImageDTO } from './dto/image.dto';
import { HttpMessage, HttpStatusCode } from 'src/common/enum/httpstatus.enum';
import { ResponseData } from 'src/common/global/responde.data';
import { ImagesService } from './images.service';
import { FoodsService } from '../foods/foods.service';
import { Public } from 'src/common/decorator/public.decorator';

@Controller({
    path: 'images',
    scope: Scope.REQUEST,
})
@ApiTags('images')
export class ImagesController {
    constructor(
        private readonly imagesService: ImagesService,
        private readonly foodsService: FoodsService,
    ){}

    @Post(':foodId')
    @ApiBearerAuth('JWT-auth')
    @Roles(Role.ADMIN)
    async createImages(
        @Param('foodId') foodId: number,
        @Body() createImagesDTO: ImageDTO[]): Promise<void> {
        try {
            await this.imagesService.createImages(foodId, createImagesDTO);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    @Delete(':foodId/:imageId')
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    async deleteImage(
        @Param('foodId') foodId: number,
        @Param('imageId') imageId: number): Promise<ResponseData<any>> {
        try {
            await this.imagesService.deleteImage(imageId, foodId);
            return new ResponseData(HttpMessage.OK, HttpStatusCode.OK, null)
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    @Put(':foodId/:imageId')
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    async updateImage(
        @Param('foodId') foodId: number,
        @Param('imageId') imageId: number,
        @Body() updateImageDTO: ImageDTO): Promise<ResponseData<any>> {
        try {
            await this.imagesService.updateImage(imageId, foodId, updateImageDTO);
            return new ResponseData(HttpMessage.OK, HttpStatusCode.OK, null)
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    @Get(':foodId')
    @Public()
    async getImages(
        @Param('foodId') foodId: number): Promise<ResponseData<ImageDTO>> {
        try {
            const images = await this.imagesService.getImages(foodId);
            if (images) {
                return new ResponseData<ImageDTO>(images, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData<ImageDTO>(null, HttpStatusCode.NOT_FOUND, HttpMessage.NOT_FOUND);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    @Get(':foodId/:imageId')
    @Public()
    async getImage(
        @Param('foodId') foodId: number,
        @Param('imageId') imageId: number): Promise<ResponseData<ImageDTO>> {
        try {
            const image = await this.imagesService.getImage(imageId, foodId);
            if (image) {
                return new ResponseData<ImageDTO>(image, HttpStatusCode.OK, HttpMessage.OK);
            }
            return new ResponseData<ImageDTO>(null, HttpStatusCode.NOT_FOUND, HttpMessage.NOT_FOUND);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    
}
