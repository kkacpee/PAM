import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm/browser";
import { TrainingHistory } from "./TrainingHistory";
import { TrainingPlanEntry } from "./TrainingPlanEntry";

@Entity()
export class TrainingPlan {

    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({
        length: 50,
        type: "varchar"
    })
    name!: string;

    @Column("boolean")
    isActive!: boolean;

    @Column("boolean")
    pushNotification!: boolean;

    @Column("boolean")
    alarm!: boolean;

    @OneToMany(() => TrainingHistory, history => history.trainingPlan)
    history!: TrainingHistory[];

    @OneToMany(() => TrainingPlanEntry, entry => entry.trainingPlan)
    entries!: TrainingPlanEntry[];
}