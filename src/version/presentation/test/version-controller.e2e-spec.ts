import { AppVersion } from '../../domain/app-version';
import { INestApplication } from '@nestjs/common';
import { TestHelper } from '../../../../test/test-helper';
import { VersionModule } from '../../version.module';
import * as request from 'supertest';

describe('VersionController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await TestHelper.buildTestingModule([
            {
                path: 'version',
                module: VersionModule,
            },
        ]);
        app = module.createNestApplication();

        await app.init();
    });

    describe('GET /version', () => {
        it('should return a success response with the right app version', async () => {
            const appVersion = new AppVersion();

            await request(app.getHttpServer())
                .get('/api/version')
                .expect(200)
                .expect({
                    ...appVersion,
                });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
