import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, OneToOne, OneToMany } from "typeorm/browser";
import { Exercise } from "./Exercise";

@Entity()
export class ExerciseCategory {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({
        length: 50,
        type: "varchar"
    })
    name: string;

    @OneToMany(() => Exercise, exercise => exercise.category)
    exercises: Exercise[];

}