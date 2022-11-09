import { Dummy } from '../domain/dummy';

export interface IDummyRepository {
    method(): Promise<Dummy[]>;
}
