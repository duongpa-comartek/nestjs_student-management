import { forwardRef, Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { ScoreModule } from 'src/score/score.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subject]),
    forwardRef(() => ScoreModule)
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService]
})

export class SubjectModule { }
