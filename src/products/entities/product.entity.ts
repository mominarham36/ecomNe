import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    amount: number;

    @CreateDateColumn()
    createdTimestamp: string;
}
