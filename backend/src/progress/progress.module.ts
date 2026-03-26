import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Progress, ProgressSchema } from './schemas/progress.schema';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Progress.name, schema: ProgressSchema }]),UsersModule],
  providers: [ProgressService],
  exports: [ProgressService],
  controllers: [ProgressController]
})
export class ProgressModule {}