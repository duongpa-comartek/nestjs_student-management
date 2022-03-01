import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/student.entity';
import { Subject } from 'src/subject/subject.entity';
import { FindConditions, Repository } from 'typeorm';
import { CreateScoreDto, DeleteScoreDto, UpdateScoreDto } from './dto';
import { Score } from './score.entity';

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(Score)
        private scoreRepository: Repository<Score>
    ) { }

    public async getAll(): Promise<Score[]> {
        return this.scoreRepository.find();
    }

    public async create({ student, subject, ...createScoreDto }: CreateScoreDto): Promise<void> {
        try {
            const newScore = {
                ...createScoreDto,
                student: { id: student } as Student,
                subject: { id: subject } as Subject
            }
            await this.scoreRepository.insert(newScore);
        } catch (err) {
            if (err.driverError.code === 'ER_NO_REFERENCED_ROW_2') {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Cannot delete a student row: a foreign key constraint fails',
                }, HttpStatus.BAD_REQUEST);
            } else {
                throw err;
            }
        }
    }

    public async update({ id, score, student, subject }: UpdateScoreDto): Promise<void> {
        await this.scoreRepository.update(
            id ? { id } : ({ student, subject } as FindConditions<Score>)
            , { score });
    }

    public async delete(param: DeleteScoreDto): Promise<void> {
        await this.scoreRepository.delete(+param.id);
    }

    public async isGoodStudent(studentID: number) {
        // const result = await this.scoreRepository.createQueryBuilder("score")
        //     .where("score.studentID = :id", { id: studentID })
        //     .getCount();

        // const temp = await this.scoreRepository.createQueryBuilder("score")
        //     .where("score.studentID = :id AND score.score > :score", { id: studentID, score: 8.5 })
        //     .getCount();

        // if (result === temp) {
        //     return true;
        // } else {
        //     return false;
        // }
    }
}
