import { AppModule } from './app.module';
import { IConfigurationService } from './infrastructure/configuration/configuration-service.interface';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configurationService = app.get<IConfigurationService>(
        'ConfigurationService',
    );

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(configurationService.application.APP_PORT);
}
bootstrap();
