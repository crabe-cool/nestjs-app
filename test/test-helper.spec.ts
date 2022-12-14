import { RoutedTestModule, TestHelper } from './test-helper';
import { VersionModule } from '../src/version/version.module';
import { existsSync, mkdirSync, rmSync } from 'fs';

describe('TestHelper', () => {
    const sut = TestHelper;

    describe('buildTestingModule()', () => {
        it('should throw error when no routedModule is given', async () => {
            const routedModules: RoutedTestModule[] = [];

            await expect(sut.buildTestingModule(routedModules)).rejects.toThrow(
                Error,
            );
        });

        it('should succeed at retrieving the module given when building the testing module', async () => {
            const routedModules: RoutedTestModule[] = [
                {
                    path: 'version',
                    module: VersionModule,
                },
            ];

            const testingModule = await sut.buildTestingModule(routedModules);

            expect(testingModule.select(VersionModule)).not.toBeUndefined();
        });
    });

    describe('createDirectories()', () => {
        it('should create directories where it is told to create them', () => {
            const tmpFilesPath = './helper_spec_test_tmp_files_path';
            const filesPath = './helper_spec_test_files_path';

            expect(existsSync(tmpFilesPath)).toBe(false);
            expect(existsSync(filesPath)).toBe(false);

            sut.createDirectories(tmpFilesPath, filesPath);

            expect(existsSync(tmpFilesPath)).toBe(true);
            expect(existsSync(filesPath)).toBe(true);

            rmSync(tmpFilesPath, { force: true, recursive: true });
            rmSync(filesPath, { force: true, recursive: true });
        });
    });

    describe('deleteDirectories()', () => {
        it('should delete given directories', () => {
            const tmpFilesPath = './helper_spec_test_tmp_files_path';
            const filesPath = './helper_spec_test_files_path';

            mkdirSync(tmpFilesPath);
            mkdirSync(filesPath);

            expect(existsSync(tmpFilesPath)).toBe(true);
            expect(existsSync(filesPath)).toBe(true);

            sut.deleteDirectories(tmpFilesPath, filesPath);

            expect(existsSync(tmpFilesPath)).toBe(false);
            expect(existsSync(filesPath)).toBe(false);
        });
    });

    describe('generateString()', () => {
        it('should throw an error if given length is below 1', () => {
            expect(() => sut.generateString(0)).toThrow(Error);
            expect(() => sut.generateString(-1)).toThrow(Error);
        });

        it('should throw an error if given length is not natural', () => {
            expect(() => sut.generateString(0.41)).toThrow(Error);
            expect(() => sut.generateString(12.8)).toThrow(Error);
        });

        it('should return a string of the length that has been given', () => {
            const length = 12;
            const result = sut.generateString(length);

            expect(result.length).toBe(length);
        });
    });
});
