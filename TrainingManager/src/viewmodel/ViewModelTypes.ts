export type CategoryViewModel = {
  name: string;
  data: ExerciseViewModel[];
};

export type ExerciseViewModel = {
  id: number;
  name: string;
  description: string;
  category: string;
  type: string;
};

export type CalendarEntryViewModel = {
  date: Date;
  title: string;
  state: CalendarEntryState;
};

export type CalendarEntryState = "finished" | "missed" | "notStarted";

export type HomeViewModel = {
  doneCount: number;
  skippedCount: number;
  leftCount: number;
  todaysTrainingName: string;
  todaysTrainingId: number | undefined;
};

export type OngoingTrainingViewModel = {
  name: string,
  repCount: number,
  setCount: number,
  time: number,
  isTimed: boolean
}[]

export type AddTrainingViewModel = {
  name: string;
  description: string;
  isFavourite: boolean;
  iconName: string;
  exerciseEntries: ExerciseEntryViewModel[];
};

export type ExerciseEntryViewModel = {
  idExercise: number;
  name: string;
  repCount: number | undefined;
  setCount: number | undefined;
  executionTime: number | undefined;
};

export type AddTrainingPlanViewModel = {
  name: string;
  notification: boolean;
  dateFrom: Date;
  dateTo: Date;
  entryModels: TrainingEntryViewModel[];
};

export type TrainingEntryViewModel = {
  dayOfWeek: number;
  idTraining: number;
};
