import { Student } from 'src/student/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    name: string;

    @Column({
        type: 'int',
        default: 20
    })
    totalMember: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    teacherName: string;

    @OneToMany(() => Student, student => student.class)
    students: Student[];
}
