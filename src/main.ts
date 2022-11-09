import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IConfigurationService } from './infrastructure/configuration/configuration-service.interface';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configurationService = app.get<IConfigurationService>(
        'ConfigurationService',
    );

    await app.listen(configurationService.application.APP_PORT);
}
bootstrap();
