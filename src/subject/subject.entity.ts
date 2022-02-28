import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
