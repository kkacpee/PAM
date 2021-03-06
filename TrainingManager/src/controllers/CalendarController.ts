import { TrainingHistory } from "../data/models/TrainingHistory";
import {
  CalendarEntryState,
  CalendarEntryViewModel,
} from "../viewmodel/ViewModelTypes";
import BaseController from "./BaseController";
import * as Notifications from "expo-notifications";
import { TrainingPlan } from "../data/models/TrainingPlan";
import { TrainingPlanEntry } from "../data/models/TrainingPlanEntry";
import { Training } from "../data/models/Training";
import { Raw } from "typeorm/browser";

export default class CalendarController extends BaseController {
  constructor() {
    super();
  }

  /**
   * GetDummyTrainings
   */
  public async GetDummyTrainings(): Promise<CalendarEntryViewModel[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    this.scheduleNotification("2020-12-29");
    return [
      {
        date: new Date("2020-12-02"),
        title: "Trening A",
        state: "finished",
        idTrainingPlan: 1,
      },
      {
        date: new Date("2020-12-30"),
        title: "Trening B",
        state: "notStarted",
        idTrainingPlan: 1,
      },
      {
        date: new Date("2020-12-16"),
        title: "Trening C",
        state: "finished",
        idTrainingPlan: 1,
      },
      {
        date: new Date("2020-12-17"),
        title: "Trening D",
        state: "finished",
        idTrainingPlan: 1,
      },
      {
        date: new Date("2020-12-18"),
        title: "Trening DUpa",
        state: "finished",
        idTrainingPlan: 1,
      },
    ];
  }

  public async GetCalendarEntriesInMonth(
    year: number,
    month: number
  ): Promise<CalendarEntryViewModel[]> {
    var repo = this.connection.getRepository(TrainingHistory);
    var historyAll = await repo.find({ relations: ["training"] });
    let history = historyAll.filter(
      (x) => x.date.getFullYear() === year && x.date.getMonth() === month
    );

    var result = new Array<CalendarEntryViewModel>();
    for (var entry of history) {
      var training = entry.training;
      result.push({
        title: training.name,
        date: entry.date,
        state: this.getCalendarEntryState(entry),
        idTrainingPlan: entry.idTrainingPlan,
      });
    }

    var notStartedEntries = await this.GenerateNotStartedEntries(year, month);
    result.push(...notStartedEntries);
    return result;
  }

  private getCalendarEntryState(entry: TrainingHistory): CalendarEntryState {
    var currentDate = new Date(Date.now());
    if (entry.isFinished) {
      return "finished";
    } else if (entry.date < currentDate) {
      return "missed";
    } else {
      return "notStarted";
    }
  }

  private async scheduleNotification(date: string) {
    // const getData = async () => {const response = await Notifications.getAllScheduledNotificationsAsync(); return response}
    // console.log(await getData())
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "TIME TO WORKOUT",
        body: "You have training today",
      },
      trigger: { date: new Date(`${date}T08:00:00Z`) },
    });
  }

  private async GenerateNotStartedEntries(
    year: number,
    month: number
  ): Promise<CalendarEntryViewModel[]> {
    const planRepo = this.connection.getRepository(TrainingPlan);
    const entryRepo = this.connection.getRepository(TrainingPlanEntry);
    const trainingRepo = this.connection.getRepository(Training);
    const historyRepo = this.connection.getRepository(TrainingHistory);
    let plans = await planRepo.find({ isActive: true });
    let currentPlans = plans.filter(
      (value) =>
        value.dateFrom.getFullYear() <= year &&
        value.dateFrom.getMonth() <= month &&
        value.dateTo.getFullYear() >= year &&
        value.dateTo.getMonth() >= month
    );

    if (currentPlans.length === 0) {
      return [];
    }

    let history = await historyRepo.find();
    const currentDate = new Date();
    let currentHistory = history.filter(
      (x) =>
        x.date.getFullYear() === currentDate.getFullYear() &&
        x.date.getMonth() === currentDate.getMonth() &&
        x.date.getDate() === currentDate.getDate()
    );

    var result = new Array<CalendarEntryViewModel>();
    for (const plan of plans) {
      let entries = await entryRepo.find({ idTrainingPlan: plan.id });
      const trainingTodayDone = entries.some(
        (x) =>
          !currentHistory.some(
            (y) =>
              y.date.getDay() === x.dayOfWeek &&
              y.idTrainingPlan === plan.id &&
              y.idTraining === x.idTraining
          )
      );

      let firstDayInMonth = new Date(year, month, 1);
      if (
        firstDayInMonth < currentDate &&
        firstDayInMonth.getMonth() === currentDate.getMonth() &&
        firstDayInMonth.getFullYear() === currentDate.getFullYear()
      ) {
        if (trainingTodayDone) {
          firstDayInMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1
          )
        } else {
          firstDayInMonth = currentDate;
        }      
      }

      if (firstDayInMonth < plan.dateFrom) {
        firstDayInMonth = plan.dateFrom;
      }

      for (let entry of entries) {
        let dayOfWeekDiff =
          (entry.dayOfWeek - firstDayInMonth.getDay() + 7) % 7;

        var trainingDay = new Date(
          firstDayInMonth.getFullYear(),
          firstDayInMonth.getMonth(),
          firstDayInMonth.getDate() + dayOfWeekDiff
        );

        while (trainingDay < plan.dateTo && trainingDay.getMonth() === month) {
          var training = await trainingRepo.findOne(entry.idTraining);
          var name = training?.name ?? "<No training> (BUG!!!!!!)";

          result.push({
            date: trainingDay,
            title: name,
            state: "notStarted",
            idTrainingPlan: plan.id,
          });
          let nextDay = trainingDay.getDate() + 7;
          trainingDay = new Date(
            firstDayInMonth.getFullYear(),
            firstDayInMonth.getMonth(),
            nextDay
          );
        }
      }
    }

    return result;
  }
}
