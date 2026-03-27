import { Injectable, NotFoundException } from '@nestjs/common';
import { Progress, ProgressDocument } from './schemas/progress.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Step } from 'src/common/enums/step.enum';
import soratCount from 'src/utils/soratCount';
import Surah from 'src/utils/surah-api';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
    private usersService: UsersService,
  ) {}

  async create(userId: string): Promise<ProgressDocument> {
    const progress = new this.progressModel({
      userId,
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

  async updateStep(
    userId: string,
    newStep: Step,
    sorah: number,
  ): Promise<ProgressDocument> {
    const progress = await this.findByUser(userId);
    if (progress.currentSorat == sorah) {
      const valideTransition = {
        [Step.READING]: Step.MEMORIZING,
        [Step.MEMORIZING]: Step.READING,
        // [Step.QUIZ]: Step.READING,
      };
      if (valideTransition[progress.step] !== newStep) {
        throw new Error(
          `Invalid step transition: ${progress.step} → ${newStep}`,
        );
      }
      progress.step = newStep;
      if (newStep === Step.MEMORIZING) {
        progress.currentAya = 1;
      }
    }
    return progress.save();
  }

  async nextAya(userId: string, sorah: number): Promise<ProgressDocument> {
    const progress = await this.findByUser(userId);
    if (progress.currentSorat == sorah) {
      progress.currentAya++;
    }
    return progress.save();
  }

  async getDashboard(userId: string) {
    const progress = await this.findByUser(userId);

    const hizbSorats = Surah()[progress.currentHizb];
    const currentSorah = hizbSorats.find(
      (s) => s.number === progress.currentSorat,
    );

    return {
      currentHizb: progress.currentHizb,
      currentSorat: progress.currentSorat,
      currentAya: progress.currentAya,
      currentSorahName: currentSorah?.englishName,
      step: progress.step,
      totalCompleted: progress.completedSorats.length,
      completedSorats: progress.completedSorats,
      unlockedHizbs: progress.unlockedHizbs,
      totalStars: progress.stars,
      badges: progress.badges,
    };
  }
  async completeSorah(userId: string, sorah: number) {
    const progress = await this.findByUser(userId);
    if (progress.currentSorat == sorah) {
      if (!progress.completedSorats.includes(progress.currentSorat)) {
        progress.completedSorats.push(progress.currentSorat);
      }
      const numberSorhInHizb = soratCount()[progress.currentHizb];
      const numOfLastSorahInHizb =
        Surah()[progress.currentHizb][numberSorhInHizb - 1].number;
      const numOfFirstSorahInHizb = Surah()[progress.currentHizb - 1][0].number;
      const currentSorahIndex =
        Surah()[progress.currentHizb].find(
          (s) => s.number === progress.currentSorat,
        ).index + 1;
      const nextSorah = Surah()[progress.currentHizb][currentSorahIndex].number;
      if (numOfLastSorahInHizb === progress.currentSorat) {
        progress.currentHizb = progress.currentHizb - 1;
        progress.currentSorat = numOfFirstSorahInHizb;
        progress.currentAya = 1;
        progress.step = Step.READING;
        progress.stars++;
        if (!progress.unlockedHizbs.includes(progress.currentHizb)) {
          progress.unlockedHizbs.push(progress.currentHizb);
        }
        if (!progress.unlockedSorats.includes(numOfFirstSorahInHizb)) {
          progress.unlockedSorats.push(numOfFirstSorahInHizb);
        }
      } else {
        progress.currentSorat = nextSorah;
        progress.currentAya = 1;
        progress.step = Step.READING;

        if (!progress.unlockedSorats.includes(nextSorah)) {
          progress.unlockedSorats.push(nextSorah);
        }
      }
    }
    progress.save();
    return progress;
  }

  async adminDashboard(userId: string) {
    const users = await this.usersService.getAllUsers();
    const TotalSoratsCompleted = (
      await this.progressModel.find().select('completedSorats')
    ).reduce((acc, progress) => acc + progress.completedSorats.length, 0);
    const TotalStars = (await this.progressModel.find().select('stars')).reduce(
      (acc, progress) => acc + progress.stars,
      0,
    );
    const TopLearner = await this.progressModel
      .find()
      .sort({ starts: -1 })
      .limit(1)
      .populate('userId', 'childName')
      .exec();
    if (!TopLearner.length) return null;

    return {
      user: users,
      userNumber: users.length,
      TotalSoratsCompleted: TotalSoratsCompleted,
      TotalStars: TotalStars,
      TopLearner: TopLearner[0].userId['childName'],
    };
  }
}
