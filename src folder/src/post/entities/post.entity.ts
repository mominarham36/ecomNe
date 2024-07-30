import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    media :string;

    @ManyToOne(()=>User,{eager: true})
    user:User
}
