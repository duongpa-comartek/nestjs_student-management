import { Injectable, StreamableFile } from '@nestjs/common';
import { CreateStudentDto, DeleteStudentDto, UpdateStudentDto, FindStudentByNameDto, FindGoodStudentOfClass, GetStudentsFilterOutcome } from './dto/index';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Class } from 'src/class/class.entity';
import { Score } from 'src/score/score.entity';
import * as XlsxTemplate from 'xlsx-template';
import * as fs from 'fs';

@Injectable()
export class StudentService {
    constructor(
        private connection: Connection,
        @InjectRepository(Student)
        private studentRepository: Repository<Student>

    ) { }

    public async getAll() {
        return await this.studentRepository.find();
    }

    public async findOneById(id: number) {
        return this.studentRepository.findOne(id);
    }

    public async findStudentClassById(classId: number) {
        const _class = {
            id: classId
        } as Class;
        return this.studentRepository.findOne({ class: _class });
    }

    public async create({ class: _class, ...createStudentDto }: CreateStudentDto): Promise<void> {
        const newStudent = {
            ...createStudentDto,
            class: { id: _class } as Class
        }
        await this.studentRepository.insert(newStudent);
    }

    public async update({ id, class: _class, ...updateStudentDto }: UpdateStudentDto): Promise<void> {
        const student = {
            ...updateStudentDto,
            class: { id: _class } as Class
        }
        await this.studentRepository.update({ id }, student);
    }

    public async delete(param: DeleteStudentDto): Promise<void> {
        await this.studentRepository.delete(+param.id);
    }

    public async getGoodStudents(findGoodStudentOfClass: FindGoodStudentOfClass) {
        const className = findGoodStudentOfClass.name;
        const limit = (findGoodStudentOfClass.limit) ? findGoodStudentOfClass.limit : 10;
        const offset = (findGoodStudentOfClass.offset) ? findGoodStudentOfClass.offset : 0;
        const result = await this.studentRepository
            .createQueryBuilder("std")
            .select(
                [
                    "std.name"
                ]
            )
            .leftJoin("std.class", "class")
            .leftJoinAndSelect(
                subQuery => {
                    return subQuery
                        .select("studentId")
                        .addSelect("MIN(score)", "minscore")
                        .from(Score, "s")
                        .groupBy("studentId")
                }, "info", "info.studentId = std.id"
            )
            .where("info.minscore > :min", { min: 8.5 })
            .andWhere("class.name = :name", { name: className })
            .offset(offset)
            .limit(limit)
            .getRawMany();

        //Ghi vào file
        const data = await fs.promises.readFile('./src/templates/good_student.xlsx');
        const template = new XlsxTemplate(data);
        const sheetNumber = 2;
        const values = {
            title: className,
            student: result as { studentId: number, std_name: string, minScore: number }[]
        };
        template.substitute(sheetNumber, values);
        fs.writeFileSync('./src/templates/good_student.xlsx', template.generate('base64'), 'base64');
        return result;
    }

    public async getByName(query: FindStudentByNameDto) {
        console.log(query.name);
        const student = await this.studentRepository.findOne({ name: query.name });
        return student;
    }

    public async getListOutcomes(getListOutcomes: GetStudentsFilterOutcome) {
        const limit = (getListOutcomes.limit) ? getListOutcomes.limit : 10;
        const offset = (getListOutcomes.offset) ? getListOutcomes.offset : 0;
        const kindof = getListOutcomes.kindof;
        const result = await this.studentRepository
            .createQueryBuilder("std")
            .select("std.name")
            .leftJoinAndSelect(
                subQuery => {
                    return subQuery
                        .select("studentId")
                        .addSelect("ROUND(AVG(score),2)", "avgScore")
                        .addSelect(`CASE
                                    WHEN ROUND(AVG(score),2) >= 8 THEN 'Good'
                                    WHEN ROUND(AVG(score),2) > 5 AND ROUND(AVG(score),2) < 8 THEN 'Average'
                                    ELSE 'Bad'
                                END`, "outcome")
                        .from(Score, "score")
                        .groupBy("studentId")
                }, "info", "info.studentId = std.id")
            .where("info.outcome = :kindOf", { kindOf: kindof })
            .orderBy("info.avgScore")
            .offset(offset)
            .limit(limit)
            .getRawMany();


        //Ghi vào file
        const data = await fs.promises.readFile('./src/templates/outcome.xlsx');
        const template = new XlsxTemplate(data);
        const sheetNumber = 1;
        const values = {
            title: kindof,
            student: result as { studentId: number, std_name: string, avgScore: number, outcome: string }[]
        };
        template.substitute(sheetNumber, values);
        fs.writeFileSync('./src/templates/good_student.xlsx', template.generate('base64'), 'base64');
        return result;
    }
}
