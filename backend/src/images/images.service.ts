import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from 'src/foods/entity/food.entity';
import { Repository } from 'typeorm';
import { Image } from './entity/image.entity';
import { ImageDTO } from './dto/image.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
        @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
    ) {}

    async createImages(id: number, createImagesDTO: ImageDTO[]): Promise<void> {
        const food = await this.foodRepository.findOne({
            where: { id },
        });
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        if (food.images.length == 5) {
            throw new HttpException('Food already have 5 images', HttpStatus.BAD_REQUEST);
        }
        let images = createImagesDTO.map((image) => plainToClass(Image, image));
        let haveMain = false;
        images.forEach((image) => {
            image.food = food;
            if (image.isMain) {
                if (haveMain) {
                    haveMain = true;
                }
            }
        });
        if (!haveMain) {
            images[0].isMain = true;
        }
        images = await this.imageRepository.save(images);
        food.images = images;
    }

    async deleteImage(imageId, foodId: number): Promise<void> {
        const food = await this.foodRepository.findOne({
            where: { id: foodId },
        });
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        if (!food.images.find((image) => image.id == imageId)) {
            throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
        }
        const image = await this.imageRepository.findOne({
            where: { id: imageId },
        });
        if (!image){
            throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
        }
        let isMain = image.isMain;
        image.deletedAt = new Date();
        await this.imageRepository.save(image); 
        if (isMain) {
            food.images[0].isMain = true;
        }
    }

    async updateImage(imageId, foodId: number, updateImageDTO: ImageDTO): Promise<void> {
        const food = await this.foodRepository.findOne({
            where: { id: foodId },
        });
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        if (!food.images.find((image) => image.id == imageId)) {
            throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
        }
        const image = await this.imageRepository.findOne({
            where: { id: imageId },
        });
        if (!image){
            throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
        }
        if (updateImageDTO.isMain) {
            food.images.forEach((image) => {
                image.isMain = false;
            });
            image.isMain = true;
        }
        if (updateImageDTO.url) {
            image.url = updateImageDTO.url;
        }
        await this.imageRepository.save(image);
    }

    async getImages(foodId: number): Promise<ImageDTO[]> {
        const food = await this.foodRepository.findOne({
            where: { id: foodId },
        });
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        let images = food.images.map((image) => plainToClass(ImageDTO, image));
        return images;
    }

    async getMainImage(foodId: number): Promise<ImageDTO> {
        const food = await this.foodRepository.findOne({
            where: { id: foodId },
        });
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        let image = food.images.find((image) => image.isMain);
        if (!image) {
            throw new HttpException('Main image not found', HttpStatus.NOT_FOUND);
        }
        return plainToClass(ImageDTO, image);
    }

    async getImage(imageId: number, foodId: number): Promise<ImageDTO> {
        const food = await this.foodRepository.findOne({
            where: { id: foodId },
        });
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        const image = food.images.find((image) => image.id == imageId);
        if (!image) {
            throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
        }
        return plainToClass(ImageDTO, image);
    }

    async deleteAllImages(foodId: number): Promise<void> {
        const food = await this.foodRepository.findOne({
            where: { id: foodId },
        });
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        food.images.forEach((image) => {
            image.deletedAt = new Date();
        });
        await this.imageRepository.save(food.images);
    }

    async getUrlImage(imageId: number, foodId: number): Promise<string> {
        const food = await this.foodRepository.findOne({
            where: { id: foodId },
        });
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        const image = food.images.find((image) => image.id == imageId);
        if (!image) {
            throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
        }
        return image.url;
    }

    async getUrlImages(foodId: number): Promise<string[]> {
        const food = await this.foodRepository.findOne({
            where: { id: foodId },
        });
        if (!food) {
            throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
        }
        return food.images.map((image) => image.url);
    }
}
