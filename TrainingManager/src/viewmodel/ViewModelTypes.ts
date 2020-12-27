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
