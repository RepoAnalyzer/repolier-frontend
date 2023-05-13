import {describe, expect, test} from '@jest/globals';

import { keyToDisplayKey } from './KeyboardLayout.utils';

describe('After conversion keys are compatible with react-simple-keyboard', () => {
  test('Simple keys are unchanged', () => {
    expect(keyToDisplayKey('a')).toBe('a');
  });
});
