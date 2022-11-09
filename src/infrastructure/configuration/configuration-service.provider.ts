import { Provider } from "@nestjs/common";
import { ConfigurationServiceImplement } from "./configuration-service.implement";

export const ConfigurationServiceProvider: Provider = {
    provide: 'ConfigurationService',
    useClass: ConfigurationServiceImplement,
}