import { DISPLAY } from "./KeyboardLayout.constants"

export const keyToDisplayKey = (key: string) => { 
    const displayLikeKey = `{${key}}`;
    if (displayLikeKey in DISPLAY) {
        return displayLikeKey;
    }

    return key;
 }
