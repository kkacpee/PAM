import { Exercise } from "../data/models/Exercise";
import { Training } from "../data/models/Training";
import { TrainingEntry } from "../data/models/TrainingEntry";
import { AddTrainingViewModel } from "../viewmodel/ViewModelTypes";
import BaseController from "./BaseController";

export default class TrainingController extends BaseController {

    constructor() {
        super();
    }

    public async AddTrainingAsync(model : AddTrainingViewModel) {
        var trainRepo = this.connection.getRepository(Training);
        var entriesRepo = this.connection.getRepository(TrainingEntry);

        var training = trainRepo.create(model);
        training.isActive = true;

        var entries = new Array<TrainingEntry>();
        for (var entryModel of model.exerciseEntries) {
            var entry = entriesRepo.create(entryModel);
            entry.training = training;
            entries.push(entry);
        }
        training.exercises = entries;

        trainRepo.save(training);
    }

    public async GetAllExercisesAsync() : Promise<Exercise[]> {
        var repo = this.connection.getRepository(Exercise);
        return await repo.find();
    }

    public async GetAllTrainings() : Promise<Training[]> {
        var repo = this.connection.getRepository(Training);
        return await repo.find();
    }
}