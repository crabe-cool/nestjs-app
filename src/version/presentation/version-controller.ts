import { AppVersion } from '../domain/app-version';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class VersionController {
    @Get()
    getProjectVersion(): AppVersion {
        return new AppVersion();
    }
}
