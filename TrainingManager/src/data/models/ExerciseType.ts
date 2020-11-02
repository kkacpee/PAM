import { Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import { Exercise } from "./Exercise";

@Entity()
export class ExerciseType {

    @PrimaryColumn()
    id: number;

    @Column({
        length: 50
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