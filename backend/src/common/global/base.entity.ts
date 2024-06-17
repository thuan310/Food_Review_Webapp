import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class Base extends BaseEntity  {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;
    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
    @DeleteDateColumn({
        name: 'deleted_at',
        nullable: true
    })
    deletedAt: Date | null;

}