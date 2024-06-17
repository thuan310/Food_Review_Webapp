import { Base } from "src/common/global/base.entity";
import { Food } from "src/foods/entity/food.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('images')
export class Image extends Base{
    @Column()
    url: string;
    @Column({
        name: 'is_main',
        default: false
    })
    isMain: boolean;
    @ManyToOne(() => Food, (food) => food.images, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ 
        name: 'food_id',
        referencedColumnName: 'id'
    })
    food: Food;
}