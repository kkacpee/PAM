import { Entity, Column, PrimaryColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm/browser";
import { Exercise } from "./Exercise";

@Entity()
export class ExerciseType {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({
        length: 50,
        type: "varchar"
    })
    name: string;

    @OneToMany(() => Exercise, exercise => exercise.type)
    exercises: Exercise[];
}

// TODO: Verify if this is the proper way to do it
// How to handle this table?? Ask Kacper
export enum ExerciseTypeEnum {

    ExerciseTypeA = 1,

    ExerciseTypeB = 2,
}