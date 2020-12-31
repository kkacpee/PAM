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

    @Column("datetime")
    dateFrom!: Date;

    @Column("datetime")
    dateTo!: Date;

    @OneToMany(() => TrainingHistory, history => history.trainingPlan)
    history!: TrainingHistory[];

    @OneToMany(() => TrainingPlanEntry, entry => entry.trainingPlan, {
        eager: true
    })
    entries!: TrainingPlanEntry[];
}