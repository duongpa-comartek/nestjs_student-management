import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/student.entity';
import { Subject } from 'src/subject/subject.entity';
import { FindConditions, Repository } from 'typeorm';
import { CreateScoreDto, DeleteScoreDto, UpdateScoreDto, HasScoreDto } from './dto';
import { Score } from './score.entity';

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(Score)
        private readonly scoreRepository: Repository<Score>,
        private readonly mailerService: MailerService
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

    public async hasScore(hasScoreDto: HasScoreDto) {
        return await this.scoreRepository.findOne({
            student: {
                id: hasScoreDto.student
            } as Student,
            subject: {
                id: hasScoreDto.subject
            } as Subject
        });
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

    public async hasScoreSubject(studentId: number) {
        return await this.scoreRepository.count({ student: { id: studentId } as Student });
    }

    public async outcome(studentId: number) {
        return await this.scoreRepository
            .createQueryBuilder('score')
            .select('score')
            .leftJoinAndSelect('score.subject', 'subject')
            .where('studentId = :id', { id: studentId })
            .getRawMany();
    }

    public async avgScore(studentId: number) {
        const info = await this.scoreRepository
            .createQueryBuilder()
            .addSelect('AVG(score)', 'avg')
            .where('studentId = :id', { id: studentId })
            .getRawOne();
        return info.avg;
    }
}
