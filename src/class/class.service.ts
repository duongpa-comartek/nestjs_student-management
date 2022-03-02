import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassDto, DeleteClassDto, UpdateClassDto, FindStudentInfoByNameDto } from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private classRepository: Repository<Class>
    ) { }

    public async getAll(): Promise<Class[]> {
        return this.classRepository.find();
    }

    public async findOneById(id: number) {
        return this.classRepository.findOne({ id });
    }

    public async getListStudents() {
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
        await this.classRepository.delete(+id);
    }

    public async getStudentByName({ name }: FindStudentInfoByNameDto) {
        return await this.classRepository
            .createQueryBuilder("class")
            .leftJoinAndSelect("class.students", "student")
            .where(`student.name = :n`, { n: name })
            .getOne();
    }
}
