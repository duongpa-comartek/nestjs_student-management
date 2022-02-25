import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Class } from '../class/class.entity'

export type TypeGender = "Male" | "Female" | "Other";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    name: string;

    @Column({
        type: 'date',
        nullable: false
    })
    dob: Date;

    @Column({
        type: "enum",
        enum: ["Male", "Female", "Other"],
        default: "Male"
    })
    gender: TypeGender;

    @Column({ nullable: false })
    email: string;

    @ManyToOne(() => Class, classEntity => classEntity.id)
    @JoinColumn({
        name: 'classId'
    })
    classId: number;
}
