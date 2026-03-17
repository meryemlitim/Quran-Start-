import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Progress, ProgressSchema } from './schemas/progress.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Progress.name, schema: ProgressSchema }])],
  providers: [],
  exports: [],
})
export class ProgressModule {}