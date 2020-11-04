import 'reflect-metadata';
import { Connection, createConnection } from "typeorm/browser";
import React, { useState } from "react";
import { Exercise } from "./models/Exercise";
import { ExerciseCategory } from "./models/ExerciseCategory";
import { ExerciseType } from "./models/ExerciseType";
import { Training } from "./models/Training";
import { TrainingEntry } from "./models/TrainingEntry";
import { TrainingHistory } from "./models/TrainingHistory";
import { TrainingPlan } from "./models/TrainingPlan";
import { TrainingPlanEntry } from "./models/TrainingPlanEntry";

var connection : Connection = null;
//CURRENTLY UNUSED - FUCKING PIECE OF SHIT DOESN'T WORK
//NEEDS DEFINITION IN APP.TS. DON'T KNOW WHY
export function connectToDatabase() {
    return createConnection({
            type: 'expo',
            database: 'TrainingManager',
            logging: ['error', 'query', 'schema'],
            driver: require('expo-sqlite'),
            synchronize: true, //Drops database every deploy
            entities: [TrainingEntry, TrainingHistory, Exercise, ExerciseCategory, ExerciseType, Training, TrainingPlan, TrainingPlanEntry],
        });
}

export default async function getConnection() {
    if (connection == null) {
        connection = await createConnection();
    }

    return connection;
}

/* type: 'react-native',
database: 'TrainingManager',
location: 'default',
logging: ['error', 'query', 'schema'],
synchronize: true, //Drops database every deploy
entities: [TrainingEntry, TrainingHistory, Exercise, ExerciseCategory, ExerciseType, Training, TrainingPlan, TrainingPlanEntry], */