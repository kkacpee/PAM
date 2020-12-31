import { TrainingPlan } from "../data/models/TrainingPlan";
import { TrainingPlanEntry } from "../data/models/TrainingPlanEntry";
import { TrainingHistory } from "../data/models/TrainingHistory";
import { HomeViewModel, OngoingTrainingViewModel } from "../viewmodel/ViewModelTypes";
import BaseController from "./BaseController";
import { Training } from "data/models/Training";
import { ExerciseType } from "data/models/ExerciseType";
import moment from 'moment';

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

  public async GetTodaysTraining(): Promise<OngoingTrainingViewModel> {
    const entriesRepo = this.connection.getRepository(TrainingPlanEntry);

    var currentDayOfTheWeek = moment(new Date()).day();
    var data:OngoingTrainingViewModel = [];
    var entries = await entriesRepo.find();
    var entry = entries.filter(x => x.dayOfWeek == currentDayOfTheWeek)[0];
    if(entry == undefined){
      //Do sth
    }
    else{
      entry.training.exercises.map((s, i) => {
        data.push({
          name: s.exercise.name, 
          repCount: s.repCount ? s.repCount * entry.multiplier : 0 , 
          setCount: s.setCount ? s.setCount * entry.multiplier : 0, 
          time: s.executionTime ? s.executionTime * entry.multiplier : 0, 
          isTimed: (s.exercise.type.name == "time")})
    })}

    return data;
  }
}
