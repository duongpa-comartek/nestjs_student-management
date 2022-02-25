import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Score } from '../score/score.module';

@Entity()
export class Subject {

    @PrimaryGeneratedColumn()
    @OneToMany(() => Score, score => score.subjectId)
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    type: string;
}