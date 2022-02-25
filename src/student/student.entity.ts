import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Class } from '../class/class.module'
import { Score } from '../score/score.module'

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    @OneToMany(() => Score, score => score.studentId)
    id: number;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column('date', { nullable: false })
    dob: Date;

    @Column({ nullable: false })
    gender: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    @ManyToOne(() => Class, c => c.id)
    classId: number;
}