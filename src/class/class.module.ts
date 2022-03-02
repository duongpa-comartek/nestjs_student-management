import { forwardRef, Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity'
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]),
    forwardRef(() => StudentModule)
  ],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService]
})

export class ClassModule { }
