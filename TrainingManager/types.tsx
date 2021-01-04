import { AsyncState } from "react-use/lib/useAsync";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Atlas: undefined;
};

export type HomeParamList = {
  OngoingTrainingScreen: { trainingId: number; trainingPlanId: number };
  HomeScreen: undefined;
};

export type CalendarParamList = {
  CalendarScreen: undefined;
  AddTrainingPlanScreen: undefined;
};

export type ExercisesParamList = {
  ExercisesScreen: undefined;
  AddExerciseScreen: {
    addCategory: (name: string) => Promise<void>;
    categoryState: AsyncState<void>;
  };
};

export type AtlasParamList = {
  AtlasScreen: undefined;
  ExercisesScreen: undefined;
  TrainingsScreen: undefined;
};

export type TrainingsParamList = {
  AddTrainingScreen: { trainingId: number } | undefined;
  TrainingsScreen: undefined;
  TrainingDetailsScreen: { trainingId: number };
};
