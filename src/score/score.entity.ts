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

    @ManyToOne(() => Student, student => student.scores)
    @JoinColumn({ name: "studentId" })
    student: Student;

    @ManyToOne(() => Subject, subject => subject.scores)
    @JoinColumn({ name: "subjectId" })
    subject: Subject;
}
