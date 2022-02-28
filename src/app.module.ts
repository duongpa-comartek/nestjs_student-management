import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { ScoreModule } from './score/score.module';
import { SubjectModule } from './subject/subject.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection, getConnectionOptions } from 'typeorm';
import { ControllerModule } from './service/controller/controller.module';
import { EnvModule } from './env/env.module';

@Module({
  imports: [
    StudentModule,
    ClassModule,
    ScoreModule,
    SubjectModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          synchronize: true,
        }),
    }),
    ControllerModule,
    EnvModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
