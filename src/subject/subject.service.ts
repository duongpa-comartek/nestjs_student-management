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

    public async create(createSubjectDto: CreateSubjectDto): Promise<void> {
        await this.subjectRepository.save(createSubjectDto);
    }

    public async update({ id, ...updateSubjectDto }: UpdateSubjectDto): Promise<void> {
        await this.subjectRepository.update({ id }, updateSubjectDto);
    }

    public async delete(param: DeleteSubjectDto): Promise<void> {
        try {
            await this.subjectRepository.delete(+param.id);
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
}
