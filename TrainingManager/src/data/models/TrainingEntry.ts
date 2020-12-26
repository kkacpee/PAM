import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm/browser";
import { Exercise } from "./Exercise";
import { Training } from "./Training";

@Entity()
export class TrainingEntry {

    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column("int")
    idExercise!: number;

    @Column("int")
    idTraining!: number;

    @Column("int")
    repCount!: number;

    @Column("int")
    executionTime!: number; //stored as number of seconds

    @Column("int")
    order!: number;

    @ManyToOne(() => Exercise, exercise => exercise.entries)
    @JoinTable({ name: "idExercise" })
    exercise!: Exercise;

    @ManyToOne(() => Training, training => training.exercises)
    @JoinTable({ name: "idTraining" })
    training!: Training;

}