import { TrainingPlan } from "../data/models/TrainingPlan";
import { TrainingPlanEntry } from "../data/models/TrainingPlanEntry";
import { Exercise } from "../data/models/Exercise";
import { Training } from "../data/models/Training";
import { TrainingEntry } from "../data/models/TrainingEntry";
import {
  AddTrainingPlanViewModel,
  AddTrainingViewModel,
} from "../viewmodel/ViewModelTypes";
import BaseController from "./BaseController";

export default class TrainingController extends BaseController {
  constructor() {
    super();
  }

  public async AddTrainingAsync(model: AddTrainingViewModel) {
    var trainRepo = this.connection.getRepository(Training);
    var entriesRepo = this.connection.getRepository(TrainingEntry);

    var training = trainRepo.create(model);
    training.isActive = true;
    training.isFavourite = false;

    var entries = new Array<TrainingEntry>();
    for (var entryModel of model.exerciseEntries) {
      var entry = entriesRepo.create(entryModel);
      entry.training = training;
      entries.push(entry);
    }
    training.exercises = entries;

    await trainRepo.save(training);
  }

  public async AddTrainingPlanAsync(model: AddTrainingPlanViewModel) {
    var planRepo = this.connection.getRepository(TrainingPlan);
    var entriesRepo = this.connection.getRepository(TrainingPlanEntry);

    var plan = planRepo.create(model);
    plan.isActive = true;

    var entries = new Array<TrainingPlanEntry>();
    for (var entryModel of model.entryModels) {
      var entry = entriesRepo.create();
      entry.dayOfWeek = this.mapDayOfWeek(entryModel.dayOfWeek);
      entry.idTraining = entryModel.idTraining;
      entries.push(entry);
    }
    plan.entries = entries;

    await planRepo.save(plan);
  }

  public async GetAllExercisesAsync(): Promise<Exercise[]> {
    var repo = this.connection.getRepository(Exercise);
    return await repo.find({ isActive: true });
  }

  public async GetAllTrainings(): Promise<Training[]> {
    var repo = this.connection.getRepository(Training);
    return await repo.find();
  }

  public mapDayOfWeek(dayOfWeek: string): number {
    switch (dayOfWeek) {
      case "Sunday":
        return 0;
      case "Monday":
        return 1;
      case "Tuesday":
        return 2;
      case "Wednesday":
        return 3;
      case "Thursday":
        return 4;
      case "Friday":
        return 5;
      case "Saturday":
        return 6;
      default:
        throw new Error("Invalid day name");
    }
  }
}
