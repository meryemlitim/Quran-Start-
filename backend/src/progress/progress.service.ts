import { Injectable, NotFoundException } from '@nestjs/common';
import { Progress, ProgressDocument } from './schemas/progress.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Step } from 'src/common/enums/step.enum';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
  ) {}

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
  async findByUser(userId: string) {
    const progress = await this.progressModel.findOne({ userId });
    if (!progress) {
      throw new NotFoundException('Progress not found');
    }
    return progress;
  }

  async updateStep(userId: string, newStep: Step): Promise<ProgressDocument> {
    const progress = await this.progressModel.findOne({ userId });
    const valideTransition = {
      [Step.READING]: Step.MEMORIZING,
      [Step.MEMORIZING]: Step.QUIZ,
      [Step.QUIZ]: Step.READING,
    };
    if (!progress) {
      throw new NotFoundException('Progress not found');
    }

    if (valideTransition[progress.step] !== newStep) {
      throw new Error(`Invalid step transition: ${progress.step} → ${newStep}`);
    }
    progress.step = newStep;
    if (newStep === Step.MEMORIZING) {
      progress.currentAya = 1;
    }
    return progress.save();
  }

  async nextAya(userId: string): Promise<ProgressDocument>  {
    const progress = await this.progressModel.findOne({ userId });
    if (!progress) {
      throw new NotFoundException('Progress not found');
    }
    progress.currentAya++;
    return progress.save();
  }

  async getDashboard(userId:string){
    const progress = await this.findByUser(userId);
    return {
        currentHizb: progress.currentHizb,
        currentSorat: progress.currentSorat,
        currentAya: progress.currentAya,
        step:progress.step,
        totalCompleted:progress.completedSorats.length,
        completedSorats:progress.completedSorats,
        unlockedHizbs:progress.unlockedHizbs,
        totalStars:progress.stars,
        badges:progress.badges,
    };
  }
}
