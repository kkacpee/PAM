export type CategoryViewModel = {   
    name : string;
    data : ExerciseViewModel[];
}

export type ExerciseViewModel = {
    name : string;
    description : string;
    category : string;
    type : string;
}

export type CalendarEntryViewModel = {
    date : Date,
    title : string,
    state: CalendarEntryState
}

export type CalendarEntryState = "finished" | "missed" | "notStarted";