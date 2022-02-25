import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreService } from './score.service';
import { Score } from './score.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  controllers: [ScoreController],
  providers: [ScoreService]
})
export class ScoreModule { }
export { Score } from './score.entity'
