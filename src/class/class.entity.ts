import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Student } from '../student/student.module'

@Entity()
export class Class {

    @PrimaryGeneratedColumn()
    @OneToMany(() => Student, student => student.classId)
    id: number;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ nullable: false })
    totalMember: number;

    @Column({ nullable: false })
    teacherName: string;
}