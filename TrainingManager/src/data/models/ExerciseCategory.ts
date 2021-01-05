import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm/browser";
import { Exercise } from "./Exercise";

const module = require("./Exercise");

@Entity()
export class ExerciseCategory {

    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({
        length: 50,
        type: "varchar"
    })
    name!: string;

    @OneToMany(() => Exercise, exercise => exercise.category) 
    exercises!: Exercise[];

}