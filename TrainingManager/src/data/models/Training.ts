import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { TrainingEntry } from "./TrainingEntry";
import { TrainingHistory } from "./TrainingHistory";
import { TrainingPlanEntry } from "./TrainingPlanEntry";

@Entity()
export class Training {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    isActive: boolean;

    @Column()
    isFavourite: boolean;


    @OneToMany(() => TrainingHistory, history => history.training)
    history: TrainingHistory[];

    @OneToMany(() => TrainingEntry, entry => entry.training)
    exercises: TrainingEntry[];

    @OneToMany(() => TrainingPlanEntry, entry => entry.training)
    entries: TrainingPlanEntry[];
}