import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, OneToOne, OneToMany } from "typeorm";
import { Exercise } from "./Exercise";

@Entity()
export class ExerciseCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string

    @OneToMany(() => Exercise, exercise => exercise.category)
    exercises: Exercise[];

}