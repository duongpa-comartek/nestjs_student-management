import { forwardRef, Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { ClassModule } from 'src/class/class.module';
import { ScoreModule } from 'src/score/score.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    forwardRef(() => ClassModule),
    forwardRef(() => ScoreModule)
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService]
})

export class StudentModule { }
