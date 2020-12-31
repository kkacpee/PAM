import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm/browser";
import { Training } from "./Training";
import { TrainingPlan } from "./TrainingPlan";

@Entity()
export class TrainingHistory {

    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column("int")
    idTraining!: number;

    @Column("int")
    idTrainingPlan!: number;

    @Column("boolean")
    isFinished!: boolean;

    @Column("datetime")
    date!: Date;

    @ManyToOne(() => Training, training => training.history)
    @JoinColumn({ name: "idTraining"})
    training!: Training;

    @ManyToOne(() => TrainingPlan, plan => plan.history)
    @JoinColumn({ name: "idTrainingPlan"})
    trainingPlan!: Promise<TrainingPlan>;
}