import { Role } from "src/common/enum/roles.enum";
import { Base } from "src/common/global/base.entity";
import { Food } from "src/foods/entity/food.entity";
import { Review } from "src/reviews/entity/review.entity";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity('users')
export class User extends Base{
    @Column(
        {
            unique: true
        }
    )
    username: string;
    @Column()
    password: string;
    @Column(
        {
            nullable: true
        }
    )
    email: string;
    @Column(
        {
            type: 'enum',
            enum: Role,
            default: Role.USER
        }
    )
    role: Role;
    @ManyToMany(() => Food, (food) => food.users, {
        eager: true
    })
    favoriteFoods: Food[];
    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];
}