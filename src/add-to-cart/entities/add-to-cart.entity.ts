import { Product } from "src/products/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('add-to-cart')
export class AddtoCart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    userId: number;

    @Column({ nullable: true })
    productId: number;

    @Column({ nullable: true })
    totalAmount: number;

    @Column({ nullable: true })
    quantity: number;

    @Column({ nullable: true, default: 0 })
    status: number;

    @ManyToOne(() => Product, { eager: true })
    product: Product

    @ManyToOne(() => User, { eager: true })
    user: User

    @CreateDateColumn()
    createdTimestamp: string;

}
