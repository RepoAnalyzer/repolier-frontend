import {describe, expect, test} from '@jest/globals';

import { keyToDisplayKey } from './KeyboardLayout.utils';

describe('After conversion keys are compatible with react-simple-keyboard', () => {
    test.each([
        ['a', 'a'],
        ['A', 'A'],
        ['x', 'x'],
        ['X', 'X'],
        ['1', '1'],
        ['F1', 'F1'],
    ])('Simple keys are unchanged', (key, expected) => {
        expect(keyToDisplayKey(key)).toBe(expected);
    });

    test.each([
        ['space', '{space}'],
        ['esc', '{esc}'],
        ['controlleft', '{controlleft}'],
    ])('Function keys are transformed to display keys', (key, expected) => {
        expect(keyToDisplayKey(key)).toBe(expected);
    });
});
