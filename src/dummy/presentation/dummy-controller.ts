import { Controller, Get, Inject } from '@nestjs/common';
import { Dummy } from '../domain/dummy';
import { IDummyRepository } from '../application/dummy-repository.interface';

@Controller()
export class DummyController {
    constructor(
        @Inject('DummyRepository')
        private readonly dummyRepository: IDummyRepository,
    ) {}

    @Get()
    async method(): Promise<Dummy[]> {
        return await this.dummyRepository.method();
    }
}
