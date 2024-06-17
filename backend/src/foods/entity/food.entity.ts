import { Category } from "src/categories/entity/category.entity";
import { Base } from "src/common/global/base.entity";
import { Image } from "src/images/entity/image.entity";
import { Review } from "src/reviews/entity/review.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity('foods')
export class Food extends Base{
    @Column()
    name : string;
    @Column()
    description : string;
    @Column('decimal',{
        precision: 6, 
        scale: 2,
    })
    price : number;
    @ManyToMany(()=> Category, (category) => category.foods, {
        eager: true
    })
    @JoinTable({
        name: 'food_categories',
        joinColumn: {
            name: 'food_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        },
    })
    categories: Category[];
    @OneToMany(()=> Image, (image) => image.food, {
        eager: true
    })
    images: Image[];
    @ManyToMany(() => User, (user) => user.favoriteFoods)
    @JoinTable({
        name: 'user_favorite_foods',
        joinColumn: {
            name: 'food_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    users: User[];
    @OneToMany(() => Review, (review) => review.food)
    reviews: Review[];
}