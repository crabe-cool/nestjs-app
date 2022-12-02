import { AppModule } from './app.module';
import helmet from 'helmet';
import { IConfigurationService } from './infrastructure/configuration/configuration-service.interface';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configurationService = app.get<IConfigurationService>(
        'ConfigurationService',
    );
    
    if (configurationService.application.isEnvDev) {
        app.enableCors();
    } else {
        app.use(
            helmet({
                contentSecurityPolicy: false,
            }),
        );
    }

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(configurationService.application.APP_PORT);
}
bootstrap();
