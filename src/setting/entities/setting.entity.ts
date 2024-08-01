import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('setting')
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    maxQuantity: number

    @Column({ nullable: true })
    defaultOtp: number;

    @CreateDateColumn()
    createdTimestamp: string;
}
