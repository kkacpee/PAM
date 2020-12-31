import { ExerciseCategory } from "../data/models/ExerciseCategory";
import Enumerable from "linq";
import {
  CategoryViewModel,
  ExerciseViewModel,
} from "../viewmodel/ViewModelTypes";
import BaseController from "./BaseController";
import { Exercise } from "../data/models/Exercise";
import { ExerciseType } from "../data/models/ExerciseType";
import { TrainingEntry } from "../data/models/TrainingEntry";

export default class ExerciseController extends BaseController {
  constructor() {
    super();
  }

  public async GetAllExercisesCategorised(): Promise<CategoryViewModel[]> {
    var categoryRepository = this.connection.getRepository(ExerciseCategory);
    var categories = await categoryRepository.find();

    var result = new Array<CategoryViewModel>();
    for (var category of categories) {
      //When category is freshly added, it doesn't have a key and all shit breaks loose
      if (!category.id) {
        continue;
      }

      var exercises = await category.exercises;
      result.push(<CategoryViewModel>{
        name: category.name,
        data: Enumerable.from(exercises)
          .select(
            (e) =>
              <ExerciseViewModel>{
                id: e.id,
                name: e.name,
                category: category.name,
                description: e.description,
                type: "type",
              }
          )
          .toArray(),
      });
    }

    return result;
  }

  public GetExerciseById(): ExerciseViewModel {
    throw new Error();
  }

  public async AddExercise(model: ExerciseViewModel) {
    var repo = this.connection.getRepository(Exercise);
    var catRepo = this.connection.getRepository(ExerciseCategory);
    var typeRepo = this.connection.getRepository(ExerciseType);

    var exerecise = repo.create();
    var type = await typeRepo.findOne({ name: model.type });
    if (!type) {
      type = typeRepo.create();
      type.name = model.type;
    }

    var category = await catRepo.findOne({ name: model.category });
    if (!category) {
      category = catRepo.create();
      category.name = model.category;
    }

    exerecise.name = model.name;
    exerecise.description = model.description;
    exerecise.type = type;
    exerecise.category = category;
    exerecise.isActive = true;

    repo.save(exerecise);
  }

  public async deleteExerciseAsync(id: number) {
    var shouldDeleteSoft = await this.isExerciseOnAnyTraining(id);
    if (shouldDeleteSoft) {
      await this.deleteExerciseSoftAsync(id);
    } else {
      await this.deleteExerciseHardAsync(id);
    }
  }

  public async createDefault(): Promise<ExerciseViewModel> {
    var catRepo = this.connection.getRepository(ExerciseCategory);
    var typeRepo = this.connection.getRepository(ExerciseType);
    var type = await typeRepo.findOne();
    if (!type) {
      type = typeRepo.create();
      type.name = "Reps";
      typeRepo.save(type);
    }

    var cat = await catRepo.findOne();
    if (!cat) {
      cat = catRepo.create();
      cat.name = "Chest";
      catRepo.save(cat);
    }

    return {
      name: "",
      description: "",
      category: cat.name,
      type: type.name,
    };
  }

  public async getTypes(): Promise<string[]> {
    var typeRepo = this.connection.getRepository(ExerciseType);
    var types = await typeRepo.find();
    return types.map((x) => x.name);
  }

  public addType(name: string) {
    var typeRepo = this.connection.getRepository(ExerciseType);
    var type = typeRepo.create();
    type.name = name;
    typeRepo.save(type);
  }

  public async getCategories(): Promise<string[]> {
    var catRepo = this.connection.getRepository(ExerciseCategory);
    var categories = await catRepo.find();
    return categories.map((x) => x.name);
  }

  public addCategory(name: string) {
    var catRepo = this.connection.getRepository(ExerciseCategory);
    var cat = catRepo.create();
    cat.name = name;
    catRepo.save(cat);
  }

  private async isExerciseOnAnyTraining(id: number): Promise<boolean> {
    var repo = this.connection.getRepository(TrainingEntry);
    var entriesCount = await repo.count({ idExercise: id });
    return entriesCount !== 0;
  }

  private async deleteExerciseHardAsync(id: number): Promise<void> {
    var repo = this.connection.getRepository(Exercise);
    var exercise = await repo.find({ id: id });
    repo.remove(exercise);
  }

  private async deleteExerciseSoftAsync(id: number): Promise<void> {
    var repo = this.connection.getRepository(Exercise);
    var exercise = await repo.findOne({ id: id });

    if (exercise) {
      exercise.isActive = false;
      repo.save(exercise);
    }
  }
}
