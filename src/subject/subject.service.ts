import { Injectable } from '@nestjs/common';
import { CreateSubjectDto, UpdateSubjectDto, DeleteSubjectDto } from './dto/index'

@Injectable()
export class SubjectService {
    public async getAll() {
        return true;
    }

    public async create(createSubjectDto: CreateSubjectDto) {
        return true;
    }

    public async update({ id, ...updateSubjectDto }: UpdateSubjectDto) {
        return true;
    }

    public async delete(param: DeleteSubjectDto) {
        return true;
    }
}
