import { Injectable } from '@nestjs/common';
import { CreateStudentDto, DeleteStudentDto, UpdateStudentDto } from './dto/index';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>
    ) { }

    public async getAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    public async create(createStudentDto: CreateStudentDto): Promise<void> {
        await this.studentRepository.save(createStudentDto);
    }

    public async update({ id, ...updateStudentDto }: UpdateStudentDto): Promise<void> {
        await this.studentRepository.update({ id }, updateStudentDto);
    }

    public async delete(param: DeleteStudentDto): Promise<void> {
        await this.studentRepository.delete(+param.id);
    }
}
