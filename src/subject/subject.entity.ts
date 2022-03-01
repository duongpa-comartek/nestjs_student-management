import { Score } from 'src/score/score.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export type TypeSubject = "Online" | "Offline";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    name: string;

    @Column({
        type: "enum",
        enum: ["Online", "Offline"],
        default: "Online"
    })
    type: TypeSubject;

    @OneToMany(() => Score, score => score.subject)
    scores: Score
}
