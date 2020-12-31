import { TrainingPlan } from "../data/models/TrainingPlan";
import { TrainingPlanEntry } from "../data/models/TrainingPlanEntry";
import { TrainingHistory } from "../data/models/TrainingHistory";
import { HomeViewModel } from "../viewmodel/ViewModelTypes";
import BaseController from "./BaseController";

export default class HomeController extends BaseController {
  constructor() {
    super();
  }

  public async GetHomeViewModel(): Promise<HomeViewModel> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      doneCount: 20,
      skippedCount: 3,
      leftCount: 5,
      todaysTrainingName: "Training A",
      todaysTrainingId: 1,
    };
  }

  public async GetHomeViewModelAsync(): Promise<HomeViewModel> {
    const plansRepo = this.connection.getRepository(TrainingPlan);
    const historyRepo = this.connection.getRepository(TrainingHistory);
    const entriesRepo = this.connection.getRepository(TrainingPlanEntry);

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
    var leftCount = currentHistory.filter(
      (x) => !x.isFinished && x.date.getDay() >= currentDate.getDay()
    ).length;

    let todaysName = "";
    let todaysId : number | undefined;

    // TODO: Find training for today
    // var entries = await entriesRepo.find();
    // for (var entry of entries) {
    //     var trainingHistory = history.filter(x => x.idTraining === entry.idTraining);

    //     if (!trainingHistory){
            
    //     }
    // }

    return {
        doneCount: doneCount,
        skippedCount: skippedCount,
        leftCount: leftCount,
        todaysTrainingName: todaysName,
        todaysTrainingId: todaysId
    }
  }
}
