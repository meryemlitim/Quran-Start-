import { Injectable } from "@nestjs/common";
import { Progress, ProgressDocument } from "./schemas/progress.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProgressService {
  constructor(@InjectModel(Progress.name) private ProgressModule: Model<ProgressDocument>) {}

}