import { Dummy } from '../domain/dummy';
import { DummyEntity } from './dummy-entity';
import { IDummyRepository } from '../application/dummy-repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DummyRepositoryImplement implements IDummyRepository {
    constructor(
        @InjectModel('Dummy')
        private readonly dummyModel: Model<DummyEntity>,
    ) {}

    async method(): Promise<Dummy[]> {
        const result = await this.dummyModel.find<DummyEntity>({});
        return result.map((dummyEntity) => new Dummy(dummyEntity.name));
    }
}
