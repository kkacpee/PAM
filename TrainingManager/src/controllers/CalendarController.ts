import { TrainingHistory } from "../data/models/TrainingHistory";
import {
  CalendarEntryState,
  CalendarEntryViewModel,
  CalendarViewModel,
} from "../viewmodel/ViewModelTypes";
import BaseController from "./BaseController";

export default class CalendarController extends BaseController {
  constructor() {
    super();
  }

  /**
   * GetDummyTrainings
   */
  public async GetDummyTrainings(): Promise<CalendarViewModel> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      entries: [
        {
          date: new Date(2020, 12, 28),
          title: "Trening A",
          state: "finished",
        },
        {
          date: new Date(2020, 12, 29),
          title: "Trening B",
          state: "notStarted",
        },
        {
          date: new Date(2020, 12, 30),
          title: "Trening C",
          state: "missed",
        },
      ],
    };
  }

  public async GetCalendarEntriesInMonth(
    year: number,
    month: number
  ): Promise<CalendarEntryViewModel[]> {
    var repo = this.connection.getRepository(TrainingHistory);
    var history = await repo.find({
      where: {
        date: { getFullYear: year, getMonth: month },
      },
    });

    var result = new Array<CalendarEntryViewModel>();
    for (var entry of history) {
      var training = await entry.training;
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
}
