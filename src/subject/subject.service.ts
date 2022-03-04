import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto, UpdateSubjectDto, DeleteSubjectDto } from './dto/index'

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>
    ) { }

    public async getAll(): Promise<Subject[]> {
        return this.subjectRepository.find();
    }

    public async findOneById(id: number) {
        return this.subjectRepository.findOne(id);
    }

    public async create(createSubjectDto: CreateSubjectDto): Promise<void> {
        await this.subjectRepository.save(createSubjectDto);
    }

    public async update({ id, ...updateSubjectDto }: UpdateSubjectDto): Promise<void> {
        await this.subjectRepository.update({ id }, updateSubjectDto);
    }

    public async delete(param: DeleteSubjectDto): Promise<void> {
        await this.subjectRepository.delete(+param.id);
    }

    public async hasSubject(): Promise<number> {
        return await this.subjectRepository.count();
    }
}
