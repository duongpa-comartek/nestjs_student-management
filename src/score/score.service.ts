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

    public findOneById(id: number) {
        return this.scoreRepository.findOne(id);
    }

    public findScoreStudentById(studentId: number) {
        const std = {
            id: studentId
        } as Student;
        return this.scoreRepository.findOne({ student: std });
    }

    public findScoreSubjectById(subjectId: number) {
        const sub = {
            id: subjectId
        } as Subject;
        return this.scoreRepository.findOne({ subject: sub });
    }

    public async create({ student, subject, ...createScoreDto }: CreateScoreDto): Promise<void> {
        const newScore = {
            ...createScoreDto,
            student: { id: student } as Student,
            subject: { id: subject } as Subject
        }
        await this.scoreRepository.insert(newScore);
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
