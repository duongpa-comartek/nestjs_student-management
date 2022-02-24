import { Injectable } from '@nestjs/common';
import { StudentInterface } from './interfaces/student.interface'
import { CreateStudentDto, DeleteStudentDto, UpdateStudentDto } from './dto/index';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
    private listStudent: StudentInterface[] = [];

    public async getAll() {
        return this.listStudent;
    }

    public async create(createStudentDto: CreateStudentDto) {
        const data = createStudentDto as StudentInterface;
        try {
            this.listStudent.push(data);
            return data;
        } catch {
            return false;
        }
    }

    public async update({ id, ...updateStudentDto }: UpdateStudentDto) {
        try {
            const data = this.listStudent.find(e => e.id === id);
            data.name = updateStudentDto.name;
            data.dob = updateStudentDto.dob;
            data.gender = updateStudentDto.gender;
            data.email = updateStudentDto.email;
            data.classId = updateStudentDto.classId;
            return true;
        } catch {
            return false;
        }
    }

    public async delete(param: DeleteStudentDto) {
        try {
            const id: number = +param.id;
            const data: Student = this.listStudent.find(e => e.id === id);
            const index = this.listStudent.indexOf(data);
            this.listStudent.splice(index, 1);
            return data;
        } catch {
            return false;
        }
    }
}
