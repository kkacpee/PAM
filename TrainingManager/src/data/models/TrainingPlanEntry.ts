import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm";
import { Training } from "./Training";
import { TrainingPlan } from "./TrainingPlan";

@Entity()
export class TrainingPlanEntry {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idTraining: number;

    @Column()
    idTrainingPlan: number;

    @Column()
    multiplier: number;

    @Column()
    date: Date;

    @ManyToOne(() => Training, training => training.entries)
    @JoinTable({ name: "idTraining" })
    training: Training;

    @ManyToOne(() => TrainingPlan, plan => plan.entries)
    @JoinTable({ name: "idTrainingPlan" })
    trainingPlan: TrainingPlan;
}