import { LayoutType } from "./KeyboardLayout.types";

export const DISPLAY = {
    '{capslock}': 'caps lock ⇪',
    '{space}': ' ',

    '{shift}': 'shift ⇧',
    '{shiftleft}': 'shift ⇧',
    '{shiftright}': 'shift ⇧',

    '{control}': 'ctrl ⌃',
    '{controlleft}': 'ctrl ⌃',
    '{controlright}': 'ctrl ⌃',

    '{alt}': 'alt ⌥',
    '{altleft}': 'alt ⌥',
    '{altright}': 'alt ⌥',

    '{win}': 'win ⊞',
    '{winleft}': 'win ⊞',
    '{winright}': 'win ⊞',

    '{meta}': 'cmd ⌘',
    '{metaleft}': 'cmd ⌘',
    '{metaright}': 'cmd ⌘',

    '{app}': 'app ≣',
    '{backspace}': 'backspace ⌫',
    '{esc}': 'esc ⎋',
    '{tab}': 'tab ⇥',
    '{enter}': 'enter ↵',
}

// Different keyboard - different positions and length of keys.
export const LAYOUT_TYPE = LayoutType.Big;
