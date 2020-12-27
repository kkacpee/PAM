import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm/browser";
import { ExerciseCategory } from "./ExerciseCategory";
import { ExerciseType } from "./ExerciseType";
import { TrainingEntry } from "./TrainingEntry";

@Entity()
export class Exercise {

    @PrimaryGeneratedColumn("increment")
    id!: number;
    
    @Column("int")
    idExerciseType!: number;

    @Column("int")
    idExerciseCategory!: number;

    @Column( {
        length: 45,
        type: "varchar"
    })
    name!: string;

    @Column( {
        length: 200,
        type: "varchar"
    })
    description!: string;

    @Column("boolean")
    isActive!: boolean;


    @ManyToOne(() => ExerciseType, type => type.exercises, { eager: true} )
    @JoinColumn({ name: "idExerciseType", referencedColumnName: "id" })
    type!: ExerciseType;

    @ManyToOne(() => ExerciseCategory, category => category.exercises, { eager: true })
    @JoinColumn({ name: "idExerciseCategory", referencedColumnName: "id" })
    category!: ExerciseCategory;

    @OneToMany(() => TrainingEntry, entry => entry.exercise)
    entries!: TrainingEntry[];
}