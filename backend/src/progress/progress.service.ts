import { Injectable } from "@nestjs/common";
import { Progress, ProgressDocument } from "./schemas/progress.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Step } from "src/common/enums/step.enum";

@Injectable()
export class ProgressService {
  constructor(@InjectModel(Progress.name) private progressModel: Model<ProgressDocument>) {}

   async create(userId: string): Promise<ProgressDocument> {
    const progress = new this.progressModel({
      userId,
      currentHizb: 1,
      currentSorat: 1,
      currentAya: 0,
      step: Step.READING,
      unlockedHizbs: [1],
      unlockedSorats: [1],
    });
    return progress.save();
  }
}