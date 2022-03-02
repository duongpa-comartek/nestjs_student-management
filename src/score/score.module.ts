import { forwardRef, Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreService } from './score.service';
import { Score } from './score.entity'
import { StudentModule } from 'src/student/student.module';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score]),
    forwardRef(() => StudentModule),
    forwardRef(() => SubjectModule)
  ],
  controllers: [ScoreController],
  providers: [ScoreService],
  exports: [ScoreService]
})

export class ScoreModule { }
