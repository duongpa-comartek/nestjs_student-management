import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto, DeleteStudentDto, UpdateStudentDto, FindStudentByNameDto, FindGoodStudentOfClass } from './dto/index';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Class } from 'src/class/class.entity';
import { Score } from 'src/score/score.entity';

@Injectable()
export class StudentService {
    constructor(
        private connection: Connection,
        @InjectRepository(Student)
        private studentRepository: Repository<Student>

    ) { }

    public async getAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    public async create({ class: _class, ...createStudentDto }: CreateStudentDto): Promise<void> {
        try {
            const newStudent = {
                ...createStudentDto,
                class: { id: _class } as Class
            }
            await this.studentRepository.insert(newStudent);
        } catch (err) {
            if (err.driverError.code === 'ER_NO_REFERENCED_ROW_2') {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Cannot add a student row: a foreign key (classId) constraint fails',
                }, HttpStatus.BAD_REQUEST);
            } else {
                throw err;
            }
        }
    }

    public async update({ id, class: _class, ...updateStudentDto }: UpdateStudentDto): Promise<void> {
        const student = {
            ...updateStudentDto,
            class: { id: _class } as Class
        }
        await this.studentRepository.update({ id }, student);
    }

    public async delete(param: DeleteStudentDto): Promise<void> {
        try {
            await this.studentRepository.delete(+param.id);
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

    public async getGoodStudents({ name }: FindGoodStudentOfClass) {
        return await this.studentRepository
            .createQueryBuilder("std")
            .select(
                [
                    "std.name",
                ]
            )
            .leftJoin("std.class", "class")
            .leftJoin(
                subQuery => {
                    return subQuery
                        .select("studentId")
                        .addSelect("MIN(score)", "minscore")
                        .from(Score, "s")
                        .groupBy("studentId")
                }, "min", "min.studentId = std.id"
            )
            .where("min.minscore > :min", { min: 8.5 })
            .andWhere("class.name = :c", { c: name })
            .skip(0)
            .take(0)
            .getMany();
    }

    public async getByName(query: FindStudentByNameDto) {
        console.log(query.name);
        const student = await this.studentRepository.findOne({ name: query.name });
        return student;
    }
}
