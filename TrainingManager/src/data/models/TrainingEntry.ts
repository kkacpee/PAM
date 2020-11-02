import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm";
import { Exercise } from "./Exercise";
import { Training } from "./Training";

@Entity()
export class TrainingEntry {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idExercise: number;

    @Column()
    idTraining: number;

    @Column()
    repCount: number;

    @Column()
    executionTime: number; 

    @Column()
    order: number;

    @ManyToOne(() => Exercise, exercise => exercise.entries)
    @JoinTable({ name: "idExercise" })
    exercise: Exercise;

    @ManyToOne(() => Training, training => training.exercises)
    @JoinTable({ name: "idTraining" })
    training: Training;

}