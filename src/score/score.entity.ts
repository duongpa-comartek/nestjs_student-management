import { Subject } from '../subject/subject.entity';
import { Student } from '../student/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'float',
        nullable: false
    })
    score: number;

    @ManyToOne(() => Student, student => student.id)
    @JoinColumn({ name: "studentId" })
    studentId: number;

    @ManyToOne(() => Subject, subject => subject.id)
    @JoinColumn({ name: "subjectId" })
    subjectId: number;
}
