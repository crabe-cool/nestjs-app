export class Configuration {
    application = new ApplicationConfiguration();
}

enum Environment {
    Development = 'DEV',
    Production = 'PROD',
}

export class ApplicationConfiguration {
    private APP_UNDER_TEST = false;

    APP_ENV: string;
    APP_URL: string;

    get isEnvDev(): boolean {
        return this.APP_ENV === Environment.Development;
    }

    get isEnvProduction(): boolean {
        return this.APP_ENV === Environment.Production;
    }

    get isUnderTest(): boolean {
        return this.APP_UNDER_TEST;
    }

    set isUnderTest(value: boolean) {
        this.APP_UNDER_TEST = value;
    }
}
