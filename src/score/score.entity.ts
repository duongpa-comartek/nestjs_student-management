import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from '../student/student.module';
import { Subject } from '../subject/subject.module';

@Entity()
export class Score {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    score: number;

    @Column({ nullable: false })
    @ManyToOne(() => Student, student => student.id)
    studentId: number;

    @Column({ nullable: false })
    @ManyToOne(() => Subject, subject => subject.id)
    subjectId: number;

}