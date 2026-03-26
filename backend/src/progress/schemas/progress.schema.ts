import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Step } from 'src/common/enums/step.enum';

export type ProgressDocument = Progress & Document;

@Schema({ timestamps: true })
export class Progress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ default: 60 })
  currentHizb: number;

  @Prop({ default: 87 })
  currentSorat: number;

  @Prop({ default: 1 })
  currentAya: number;

  @Prop({ type: String, enum: Step, default: Step.READING })
  step: Step;

  @Prop({ type: [Number], default: [60] })
  unlockedHizbs: number[];

  @Prop({ type: [Number], default: [87] })
  unlockedSorats: number[];

  @Prop({ type: [Number], default: [] })
  completedSorats: number[];

  @Prop({ type: [String], default: [] })
  badges: string[];

  @Prop({ default: 0 })
  stars: number;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);