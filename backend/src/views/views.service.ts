import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { View } from './entity/view.entity';
import { Repository } from 'typeorm';
import { ViewDto } from './dto/view.dto';

@Injectable()
export class ViewsService {
    constructor(
        @InjectRepository(View) private readonly viewRepository: Repository<View>
    ){}
    async createView(view: ViewDto): Promise<ViewDto> {
        let newView = new View();
        newView.pathName = view.pathName;
        newView.count = 1;
        newView = await this.viewRepository.save(newView);
        view.id = newView.id;
        view.count = newView.count;
        return view;
    }

    async incrementViewCount(viewDto: ViewDto): Promise<ViewDto> {
        let v = new ViewDto();
        let view = await this.viewRepository.findOne({
            where: {pathName: viewDto.pathName}
        });
        if(!view){
           v = await this.createView(viewDto);
        } else {
            view.count++;
            await this.viewRepository.save(view);
            v.id = view.id;
            v.pathName = view.pathName;
            v.count = view.count;
        }
        return v;
    }

    async getViews(): Promise<ViewDto[]> {
        let views = await this.viewRepository.find();
        return views.map(view => {
            let v = new ViewDto();
            v.id = view.id;
            v.pathName = view.pathName;
            v.count = view.count;
            return v;
        });
    }

    async getView(viewDto: ViewDto): Promise<ViewDto> {
        let view = await this.viewRepository.findOne({
            where: {pathName: viewDto.pathName}
        });
        if(!view){
            return null;
        }
        let v = new ViewDto();
        v.id = view.id;
        v.pathName = view.pathName;
        v.count = view.count;
        return v;
    }

    async getTopViews(limit: number): Promise<ViewDto[]> {
        let views = await this.viewRepository.find({
            order: {count: 'DESC'},
            take: limit
        });
        return views.map(view => {
            let v = new ViewDto();
            v.id = view.id;
            v.pathName = view.pathName;
            v.count = view.count;
            return v;
        });
    }

}
