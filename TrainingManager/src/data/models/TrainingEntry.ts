import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, JoinColumn } from "typeorm/browser";
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
    repCount: number | undefined;

    @Column("int")
    setCount: number | undefined;

    @Column("int")
    executionTime: number | undefined; //stored as number of seconds

    @Column("int")
    order!: number;

    @ManyToOne(() => Exercise, exercise => exercise.entries, {
        eager: true
    })
    @JoinColumn({ name: "idExercise", referencedColumnName: "id" })
    exercise!: Exercise;

    @ManyToOne(() => Training, training => training.exercises, {
        eager: true
    })
    @JoinTable({ name: "idTraining" })
    training!: Training;

}