import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Training } from "./Training";
import { TrainingPlan } from "./TrainingPlan";

@Entity()
export class TrainingHistory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isFinished: boolean;

    @Column()
    date: Date;

    @Column()
    idTraining: number;

    @Column()
    idTrainingPlan: number;


    @ManyToOne(() => Training, training => training.history)
    @JoinColumn({ name: "idTraining"})
    training: Training;

    @ManyToOne(() => TrainingPlan, plan => plan.history)
    @JoinColumn({ name: "idTrainingPlan"})
    trainingPlan: TrainingPlan;
}