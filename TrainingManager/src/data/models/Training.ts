import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm/browser";
import { TrainingEntry } from "./TrainingEntry";
import { TrainingHistory } from "./TrainingHistory";
import { TrainingPlanEntry } from "./TrainingPlanEntry";

@Entity()
export class Training {

    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({
        length: 50,
        type: "varchar"
    })
    name!: string;

    @Column({
        length: 300,
        type: "varchar"
    })
    description!: string;

    @Column({
        length: 100,
        type: "varchar"
    })
    iconName!: string; 

    @Column("boolean")
    isActive!: boolean;

    @Column("boolean")
    isFavourite!: boolean;

    @OneToMany(() => TrainingHistory, history => history.training)
    history!: TrainingHistory[];

    @OneToMany(() => TrainingEntry, entry => entry.training)
    exercises!: TrainingEntry[];

    @OneToMany(() => TrainingPlanEntry, entry => entry.training)
    entries!: TrainingPlanEntry[];
}