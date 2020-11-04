import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm/browser";
import { Training } from "./Training";
import { TrainingPlan } from "./TrainingPlan";

@Entity()
export class TrainingPlanEntry {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("int")
    idTraining: number;

    @Column("int")
    idTrainingPlan: number;

    @Column("float")
    multiplier: number;

    @Column("datetime")
    date: Date;

    @ManyToOne(() => Training, training => training.entries)
    @JoinTable({ name: "idTraining" })
    training: Training;

    @ManyToOne(() => TrainingPlan, plan => plan.entries)
    @JoinTable({ name: "idTrainingPlan" })
    trainingPlan: TrainingPlan;
}