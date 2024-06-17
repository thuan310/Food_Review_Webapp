import { Base } from "src/common/global/base.entity";
import { Column, Entity } from "typeorm";

@Entity('views')
export class View extends Base{
    @Column({
        name : 'path_name',
        nullable: false
    })
    pathName: string;
    @Column()
    count: number;
}