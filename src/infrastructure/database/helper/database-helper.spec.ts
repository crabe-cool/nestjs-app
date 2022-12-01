import { DbHelper, StringReplaceValue } from './database-helper';

describe('DbHelper', () => {
    const sut = DbHelper;

    describe('replace', () => {
        it('should throw an error when given source is empty', () => {
            const inputs = ['', ' ', '   '];
            for (const input of inputs) {
                expect(() => sut.replace(input)).toThrowError();
            }
        });

        it('should throw an error when no replace value is given', () => {
            expect(() => sut.replace('source', ...[])).toThrowError();
        });

        it('should throw an error if given source does not contain replace value placeholder', () => {
            const source = 'source';
            const replaceValue: StringReplaceValue = {
                placeholder: '<test>',
                newValue: 'any value',
            };

            expect(() => sut.replace(source, replaceValue)).toThrowError();
        });

        it('should replace source placeholders by replace values', () => {
            const source = 'this <any> is <adjective>';
            const replaceValues: StringReplaceValue[] = [
                {
                    placeholder: '<any>',
                    newValue: 'thing',
                },
                {
                    placeholder: '<adjective>',
                    newValue: 'tricky',
                },
            ];

            const result = sut.replace(source, ...replaceValues);

            expect(result).toBe('this thing is tricky');
        });
    });
});
