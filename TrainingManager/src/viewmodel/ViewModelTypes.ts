export type CategoryViewModel = {
  name: string;
  data: ExerciseViewModel[];
};

export type ExerciseViewModel = {
  id: number,
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

export type AddTrainingViewModel = {
  name: string;
  description: string;
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
