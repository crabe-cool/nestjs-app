export type StringReplaceValue = { placeholder: string; newValue: string };

export class DbHelper {
    static replace(
        source: string,
        ...replaceValues: StringReplaceValue[]
    ): string {
        if (DbHelper.isSourceEmptyOrFullyWhitespaced(source)) {
            throw new Error('Given source is empty or fully whitespaced.');
        }

        if (DbHelper.haveNoReplaceValuesBeenGiven(replaceValues)) {
            throw new Error('No replace value was given.');
        }

        let transformed = source;
        for (const replaceValue of replaceValues) {
            if (!transformed.includes(replaceValue.placeholder)) {
                throw new Error(
                    `Given string "${transformed}" doesn't include placeholder "${replaceValue.placeholder}".`,
                );
            }

            transformed = transformed.replace(
                replaceValue.placeholder,
                replaceValue.newValue,
            );
        }

        return transformed;
    }

    private static haveNoReplaceValuesBeenGiven(
        replaceValues: StringReplaceValue[],
    ) {
        return replaceValues.length === 0;
    }

    private static isSourceEmptyOrFullyWhitespaced(source: string) {
        return !source.trim();
    }
}
