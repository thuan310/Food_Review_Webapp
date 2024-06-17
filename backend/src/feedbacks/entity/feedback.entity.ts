import { Base } from "src/common/global/base.entity";
import { BaseEntity, Column, Entity } from "typeorm";

@Entity('feedbacks')
export class Feedback extends Base{
    @Column()
    email: string;
    @Column()
    name: string;
    @Column()
    date: Date;
    @Column()
    message: string;
    @Column({
        name: 'is_user',
        default: false
    })
    isUser: boolean;
}

