import { HttpCode, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entity/category.entity";
import { Repository } from "typeorm";
import { ResponseData } from "src/common/global/responde.data";
import { CategoryDTO } from "./dto/category.dto";
import { Food } from "src/foods/entity/food.entity";

@Injectable()
export class CategoriesService{
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
    ){}

    async createCategory(createCategoryDTO: CategoryDTO): Promise<CategoryDTO> {
        if (!createCategoryDTO){
            return null;
        }
        var category = new Category();
        category.name = createCategoryDTO.name;
        category.colorCode = createCategoryDTO.colorCode;
        category.tag = createCategoryDTO.tag;
        category = await this.categoryRepository.save(category);
        createCategoryDTO.id = category.id;
        return createCategoryDTO;
    }

    async updateCategory(id: number, updateCategoryDTO: CategoryDTO): Promise<CategoryDTO> {
        if (!updateCategoryDTO){
            return null;
        }
        const category = await this.categoryRepository.findOne({
            where: {id: id}
        });
        if (!category){
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        if (updateCategoryDTO.name){
            category.name = updateCategoryDTO.name;
        }
        if (updateCategoryDTO.colorCode){
            category.colorCode = updateCategoryDTO.colorCode;
        }
        if (updateCategoryDTO.tag){
            category.tag = updateCategoryDTO.tag;
        }
        this.categoryRepository.save(category);
        return category;
    }

    async getAllCategories(): Promise<CategoryDTO[]> {
        const categories = await this.categoryRepository.find();
        const categoryDTOs: CategoryDTO[] = [];
        categories.map(category => {
            categoryDTOs.push({
                id: category.id,
                name: category.name,
                colorCode: category.colorCode,
                tag: category.tag,
            });
        });
        return categoryDTOs;
    }

    async getCategoryById(id: number): Promise<CategoryDTO> {
        const category = await this.categoryRepository.findOne({
            where: {id: id}
        });
        if (!category){
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        var categoryDTO = new CategoryDTO();
        categoryDTO.id = category.id;
        categoryDTO.name = category.name;
        categoryDTO.colorCode = category.colorCode;
        categoryDTO.tag = category.tag;
        return categoryDTO;
    }

    async deleteCategory(id: number): Promise<boolean> {
        const category = await this.categoryRepository.findOne({
            where: {id: id}
        });
        if (!category){
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        category.deletedAt = new Date();
        this.categoryRepository.save(category);
        return true;
    }
    async getCategoriesByFood(id: number): Promise<CategoryDTO[]> {
        const food = await this.foodRepository.findOne({
            where: {id: id},
            relations: ['categories'],
        });
        if (!food){
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        const categoryDTOs: CategoryDTO[] = [];
        food.categories.map(category => {
            categoryDTOs.push({
                id: category.id,
                name: category.name,
                colorCode: category.colorCode,
                tag: category.tag,
            });
        });
        return categoryDTOs;
    }
}