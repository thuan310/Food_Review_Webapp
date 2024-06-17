import { Base } from "src/common/global/base.entity";
import { Food } from "src/foods/entity/food.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('reviews')
export class Review extends Base{
    @ManyToOne(() => User, (user) => user.reviews, { eager: true })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user: User;
    @ManyToOne(() => Food, (food) => food.reviews, { eager: true })
    @JoinColumn({
        name: 'food_id',
        referencedColumnName: 'id'
    })
    food: Food;
    @Column()
    rating: number;
    @Column()
    comment: string;
}