import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, OneToOne, OneToMany } from "typeorm";
import { ExerciseCategory } from "./ExerciseCategory";
import { ExerciseType } from "./ExerciseType";
import { TrainingEntry } from "./TrainingEntry";

@Entity()
export class Exercise {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    idExerciseType: number;

    @Column()
    idExerciseCategory: number;

    @Column( {
        length: 45
    })
    name: string;

    @Column( {
        length: 200
    })
    description: string;

    @Column()
    isActive: boolean;


    @ManyToOne(() => ExerciseType, type => type.exercises)
    @JoinColumn({ name: "idExerciseType" })
    type: ExerciseType;

    @ManyToOne(() => ExerciseCategory, category => category.exercises)
    @JoinColumn({ name: "idExerciseCategory" })
    category: ExerciseCategory;

    @OneToMany(() => TrainingEntry, entry => entry.exercise)
    entries: TrainingEntry[];
}