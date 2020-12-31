import { TrainingHistory } from "../data/models/TrainingHistory";
import {
  CalendarEntryState,
  CalendarEntryViewModel,
} from "../viewmodel/ViewModelTypes";
import BaseController from "./BaseController";
import * as Notifications from "expo-notifications";

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
      },
      {
        date: new Date("2020-12-30"),
        title: "Trening B",
        state: "notStarted",
      },
      {
        date: new Date("2020-12-16"),
        title: "Trening C",
        state: "finished",
      },
      {
        date: new Date("2020-12-17"),
        title: "Trening D",
        state: "finished",
      },
      {
        date: new Date("2020-12-18"),
        title: "Trening DUpa",
        state: "finished",
      },
    ];
  }

  public async GetCalendarEntriesInMonth(
    year: number,
    month: number
  ): Promise<CalendarEntryViewModel[]> {
    var repo = this.connection.getRepository(TrainingHistory);
    var historyAll = await repo.find();
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
      });
    }

    return result;
  }

  private getCalendarEntryState(entry: TrainingHistory): CalendarEntryState {
    var currentDate = new Date(Date.now());
    console.log("Current date: ", currentDate);
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
}
