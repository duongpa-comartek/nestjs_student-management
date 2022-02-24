import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule, Student } from './student/student.module';
import { ClassModule, Class } from './class/class.module';
import { ScoreModule, Score } from './score/score.module';
import { SubjectModule, Subject } from './subject/subject.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection, getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    StudentModule,
    ClassModule,
    ScoreModule,
    SubjectModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'student',
      entities: [Class, Student, Score, Subject],
      synchronize: true,
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
