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
    training.isFavourite = model.isFavourite;

    var entries = new Array<TrainingEntry>();
    for (var entryModel of model.exerciseEntries) {
      var entry = entriesRepo.create(entryModel);
      entry.training = training;
      entries.push(entry);
    }
    training.exercises = entries;

    await trainRepo.save(training);
    await entriesRepo.save(entries);
  }

  public async AddTrainingPlanAsync(model: AddTrainingPlanViewModel) {
    this.connection.transaction(async (manager) => {
      var planRepo = this.connection.getRepository(TrainingPlan);
      var entriesRepo = this.connection.getRepository(TrainingPlanEntry);
      //var historyRepo = this.connection.getRepository(TrainingHistory);

      var plan = planRepo.create(model);
      plan.isActive = true;
      plan.pushNotification = model.notification;
      plan.alarm = true;

      plan = await planRepo.save(plan);

      var entries = new Array<TrainingPlanEntry>();
      for (var entryModel of model.entryModels) {
        var entry = entriesRepo.create();
        entry.dayOfWeek = entryModel.dayOfWeek;
        entry.idTraining = entryModel.idTraining;
        entry.idTrainingPlan = plan.id;
        entry.multiplier = 1;
        entries.push(entry);
      }
      plan.entries = entries;

      await entriesRepo.save(entries);
    });
  }

  public async GetTrainingById(id: number): Promise<AddTrainingViewModel> {
    let trainRepo = this.connection.getRepository(Training);
    let entriesRepo = this.connection.getRepository(TrainingEntry);
    let exerciseRepo = this.connection.getRepository(Exercise);

    let training = await trainRepo.findOne(id);
    let entries = await entriesRepo.find({ idTraining: id });
    let exercises = await exerciseRepo.findByIds(
      entries.map((value) => value.idExercise)
    );

    let entryModels = entries.map((value) => ({
      idExercise: value.idExercise,
      name: exercises.find((e) => e.id === value.idExercise)!.name,
      repCount: value.repCount,
      setCount: value.setCount,
      executionTime: value.executionTime,
    }));

    let model: AddTrainingViewModel = {
      name: training?.name ?? "",
      description: training?.description ?? "",
      isFavourite: training?.isFavourite ?? false,
      iconName: training?.iconName ?? "weight-pound",
      exerciseEntries: entryModels,
    };

    return model;
  }

  public async DeleteTrainingAsync(id: number) {
    var shouldDeleteSoft = await this.isTrainingOnAnyPlan(id);
    if (shouldDeleteSoft) {
      await this.deleteTrainingSoftAsync(id);
    } else {
      await this.deleteTrainingHardAsync(id);
    }
  }

  public async UpdateTrainingAsync(id: number, model: AddTrainingViewModel) {
    await this.connection.transaction(async (manager) => {
      let trainRepo = manager.getRepository(Training);
      let entriesRepo = manager.getRepository(TrainingEntry);

      var training = await trainRepo.findOne(id);

      if (!training) {
        // Nothing to update.
        return;
      }

      const { exerciseEntries, ...data } = model;
      await trainRepo.update(id, data);
      training = await trainRepo.findOne(id); // Refresh local after update
      await trainRepo.save(training!);

      entriesRepo.delete({ idTraining: id });

      var entries = new Array<TrainingEntry>();
      for (var entryModel of exerciseEntries) {
        var entry = entriesRepo.create(entryModel);
        entry.training = training!;
        entry.idTraining = training!.id;
        entry.order = exerciseEntries.indexOf(entryModel);
        entry.idExercise = entryModel.idExercise;
        entries.push(entry);
      }
      training!.exercises = entries;

      await entriesRepo.save(entries);
    });
  }

  public async GetAllExercisesAsync(): Promise<Exercise[]> {
    var repo = this.connection.getRepository(Exercise);
    console.log("hello from controller");
    var result = await repo
      .createQueryBuilder("exercise")
      .where("exercise.isActive = :isActive", { isActive: true })
      .innerJoinAndSelect("exercise.type", "type")
      .getMany();

    console.log(result);
    return result;
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

  private async isTrainingOnAnyPlan(id: number): Promise<boolean> {
    var repo = this.connection.getRepository(TrainingPlanEntry);
    var entriesCount = await repo.count({ idTraining: id });
    return entriesCount !== 0;
  }

  private async deleteTrainingHardAsync(id: number): Promise<void> {
    var repo = this.connection.getRepository(Training);
    var training = await repo.find({ id: id });
    repo.remove(training);
  }

  private async deleteTrainingSoftAsync(id: number): Promise<void> {
    var repo = this.connection.getRepository(Training);
    var training = await repo.findOne({ id: id });

    if (training) {
      training.isActive = false;
      repo.save(training);
    }
  }
}
