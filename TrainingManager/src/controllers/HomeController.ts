import { TrainingPlan } from "../data/models/TrainingPlan";
import { TrainingPlanEntry } from "../data/models/TrainingPlanEntry";
import { TrainingHistory } from "../data/models/TrainingHistory";
import {
  HomeViewModel,
  OngoingTrainingViewModel,
} from "../viewmodel/ViewModelTypes";
import BaseController from "./BaseController";
import { Training } from "../data/models/Training";
import { TrainingEntry } from "../data/models/TrainingEntry";
import { ExerciseType } from "../data/models/ExerciseType";

export default class HomeController extends BaseController {
  constructor() {
    super();
  }

  public async GetHomeViewModelAsync(): Promise<HomeViewModel> {
    const planRepo = this.connection.getRepository(TrainingPlan);
    const historyRepo = this.connection.getRepository(TrainingHistory);
    const entriesRepo = this.connection.getRepository(TrainingPlanEntry);
    const trainingRepo = this.connection.getRepository(Training);

    var currentDate = new Date();
    var history = await historyRepo.find();
    var currentHistory = history.filter(
      (x) => x.date.getMonth() === currentDate.getMonth()
    );
    var doneCount = currentHistory.filter(
      (x) => x.isFinished && x.date.getDay() <= currentDate.getDay()
    ).length;
    var skippedCount = currentHistory.filter(
      (x) => !x.isFinished && x.date.getDay() < currentDate.getDay()
    ).length;

    let todaysName = "";
    let todaysId: number | undefined;
    let todaysPlanId: number | undefined;

    let plans = await planRepo.find({ isActive: true });
    let currentPlans = plans.filter(
      (value) => value.dateFrom <= currentDate && value.dateTo >= currentDate
    );
    var leftCount = await this.GetLeftCount(currentPlans);

    for (const plan of currentPlans) {
      let entries = await entriesRepo.find({ idTrainingPlan: plan.id });
      let entriesForToday = entries.filter(
        (x) => x.dayOfWeek == currentDate.getDay()
      );

      if (entriesForToday.length === 0) {
        continue;
      }

      let entry = entries[0];
      let training = await trainingRepo.findOne({ id: entry.idTraining });

      if (training) {
        let historyEntries = await historyRepo.find({
          idTraining: training.id,
          idTrainingPlan: plan.id,
        });
        let currentEntries = historyEntries.filter(
          (x) =>
            x.date.getFullYear() === currentDate.getFullYear() &&
            x.date.getMonth() === currentDate.getMonth() &&
            x.date.getDate() === currentDate.getDate()
        );

        if (currentEntries.length === 0) {
          todaysName = training.name;
          todaysId = training.id;
          todaysPlanId = plan.id;
          break;
        }
      }
    }

    return {
      doneCount: doneCount,
      skippedCount: skippedCount,
      leftCount: leftCount,
      todaysTrainingName: todaysName,
      todaysTrainingId: todaysId,
      todaysPlanId: todaysPlanId,
    };
  }

  public async GetTodaysTraining(
    trainingId: number
  ): Promise<OngoingTrainingViewModel> {
    const entriesRepo = this.connection.getRepository(TrainingEntry);
    const typeRepo = this.connection.getRepository(ExerciseType);
    let entries = await entriesRepo
      .createQueryBuilder("entry")
      .where("entry.idTraining = :id", { id: trainingId })
      .innerJoinAndSelect("entry.exercise", "exercise")
      .getMany();

    const timeType = await typeRepo.findOne({ name: "time" });
    const timeTypeId = timeType!.id;

    let data: OngoingTrainingViewModel = [];

    entries.map((s, i) => {
      data.push({
        name: s.exercise.name,
        repCount: s.repCount ? s.repCount : 0,
        setCount: s.setCount ? s.setCount : 0,
        time: s.executionTime ? s.executionTime : 0,
        isTimed: s.exercise.idExerciseType === timeTypeId,
      });
    });
    return data;
  }

  public async RegisterFinishedTraining(
    idTraining: number,
    idTrainingPlan: number
  ) {
    const entryRepo = this.connection.getRepository(TrainingHistory);

    let entry = entryRepo.create({
      date: new Date(),
      idTraining: idTraining,
      idTrainingPlan: idTrainingPlan,
      isFinished: true,
    });

    entryRepo.save(entry);
  }

  private async GetLeftCount(plans: TrainingPlan[]): Promise<number> {
    const entriesRepo = this.connection.getRepository(TrainingPlanEntry);

    let counter = 0;
    for (const plan of plans) {
      let entries = await entriesRepo.find({ idTrainingPlan: plan.id });

      for (const entry of entries) {
        let dayOfWeekDiff = (entry.dayOfWeek - plan.dateFrom.getDay()) % 7;
        var trainingDay = new Date(
          plan.dateFrom.getFullYear(),
          plan.dateFrom.getMonth(),
          plan.dateFrom.getDate() + dayOfWeekDiff
        );

        while (trainingDay < plan.dateTo) {
          counter++;

          let nextDay = trainingDay.getDate() + 7;
          trainingDay = new Date(
            trainingDay.getFullYear(),
            trainingDay.getMonth(),
            nextDay
          );
        }
      }
    }

    return counter;
  }
}
