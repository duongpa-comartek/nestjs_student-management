import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassDto, DeleteClassDto, UpdateClassDto, FindStudentInfoByNameDto } from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { Student } from 'src/student/student.entity';

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private classRepository: Repository<Class>
    ) { }

    public async getAll(): Promise<Class[]> {
        return this.classRepository.find();
    }

    public async getStudents() {
        return await this.classRepository
            .createQueryBuilder("cls")
            .addSelect("cls.name", "student.name")
            .leftJoinAndSelect("cls.students", "student")
            .leftJoinAndSelect("student.scores", "score")
            .leftJoinAndSelect("score.subject", "subject")
            .where("score.score > :score", { score: 8 })
            .getMany();
    }

    public async create(createClassDto: CreateClassDto): Promise<void> {
        await this.classRepository.save(createClassDto);
    }

    public async update({ id, ...updateClassDto }: UpdateClassDto): Promise<void> {
        await this.classRepository.update({ id }, updateClassDto);
    }

    public async delete({ id }: DeleteClassDto): Promise<void> {
        try {
            await this.classRepository.delete(+id);
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

    public async getStudentByName({ name }: FindStudentInfoByNameDto) {
        return await this.classRepository
            .createQueryBuilder("class")
            .leftJoinAndSelect("class.students", "student")
            .where(`student.name = :n`, { n: name })
            .getOne();
    }
}
