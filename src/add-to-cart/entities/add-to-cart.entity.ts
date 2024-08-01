import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('add-to-cart')
export class AddtoCart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    amount: number;
}
