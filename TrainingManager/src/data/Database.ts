import { ConnectionOptions } from "typeorm/browser"
import { Exercise } from "./models/Exercise"
import { ExerciseCategory } from "./models/ExerciseCategory"
import { ExerciseType } from "./models/ExerciseType"
import { Training } from "./models/Training"
import { TrainingEntry } from "./models/TrainingEntry"
import { TrainingHistory } from "./models/TrainingHistory"
import { TrainingPlan } from "./models/TrainingPlan"
import { TrainingPlanEntry } from "./models/TrainingPlanEntry"

export const connectionName = 'default';

// This is here because typeorm doesn't support loading from config with expo.
export const dbConfig : ConnectionOptions = {
    name: connectionName,
    type: 'expo',
    database: 'TrainingManager',
    logging: ['error', 'query', 'schema'],
    driver: require('expo-sqlite'),
    synchronize: true, //Drops database every deploy
    entities: [TrainingEntry, Exercise, ExerciseCategory, ExerciseType, Training, TrainingPlan, TrainingPlanEntry, TrainingHistory],
}