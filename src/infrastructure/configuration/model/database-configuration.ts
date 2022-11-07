export interface IDatabaseConfiguration {
    MONGODB_URI: string;
    MONGODB_DEV_URI: string;
    MONGODB_USER: string;
    MONGODB_PASSWORD: string;
    MONGODB_DBNAME: string;
    MONGODB_TESTING_DBNAME: string;
}

export class DatabaseConfiguration implements IDatabaseConfiguration {
    MONGODB_URI: string;
    MONGODB_DEV_URI: string;
    MONGODB_USER: string;
    MONGODB_PASSWORD: string;
    MONGODB_DBNAME: string;
    MONGODB_TESTING_DBNAME: string;
}
