import { get, mapKeys } from 'lodash';
import { makeAutoObservable, toJS } from 'mobx';

import { Keymapping } from './KeyboardLayout.types'
import { keyToDisplayKey } from './KeyboardLayout.utils';

export type Dictionary<T> = Record<string, T>;

const _KEYMAPPINGS: Dictionary<Keymapping> = { 
    controlleft: {
        a: {
            action: 'someFunction()',
            description: 'AutoComplete'
        },
        t: {
            action: 'someTea()',
        },
    },

    altleft: {
        c: {
            action: 'copy()',
            description: 'Mega copy',
        },
    },

    a: {
        b: {
            action: 'beta()',
            description: 'Beta!',
        },
    },
 }

const KEYMAPPINGS = mapKeys(_KEYMAPPINGS, (_, key) => keyToDisplayKey(key))

class Keymappings {
    keys:string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    push(key: string) {
        return this.keys.push(key)
    }

    pop() {
        return this.keys.pop()
    }

    get _currentPossibleKeymappings() {
        return !this.keys.length ? KEYMAPPINGS : get(KEYMAPPINGS, this.keys) as Keymapping | string | undefined;
    }

    get children(): string[] {
        if (!this._currentPossibleKeymappings || typeof this._currentPossibleKeymappings === 'string') {
            return [];
        }

        return Object.keys(toJS(this._currentPossibleKeymappings));
    }

    get childrenFormatted(): string {
        return this.children.join(' ');
    }
}

export const keymappingsStore = new Keymappings();
