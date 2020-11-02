import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { TrainingHistory } from "./TrainingHistory";
import { TrainingPlanEntry } from "./TrainingPlanEntry";

@Entity()
export class TrainingPlan {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @Column()
    isActive: boolean;

    @Column()
    pushNotification: boolean;

    @Column()
    alarm: boolean;

    @OneToMany(() => TrainingHistory, history => history.trainingPlan)
    history: TrainingHistory[];

    @OneToMany(() => TrainingPlanEntry, entry => entry.trainingPlan)
    entries: TrainingPlanEntry[];
}