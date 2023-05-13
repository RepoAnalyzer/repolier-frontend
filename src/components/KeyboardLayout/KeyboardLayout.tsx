import React, { useRef, useState } from "react";
import Keyboard, { SimpleKeyboard } from "react-simple-keyboard";
import cnBind from 'classnames/bind';
import { observer } from 'mobx-react-lite';
import { SimpleKeyboardLayouts } from 'simple-keyboard-layouts';

import { DISPLAY, LAYOUT_TYPE } from './KeyboardLayout.constants'
import { keymappingsStore } from "./KeyboardLayout.store";
import { LayoutType } from "./KeyboardLayout.types";

import "react-simple-keyboard/build/css/index.css";
import styles from "./KeyboardLayout.module.scss";

const cx = cnBind.bind(styles);

export type KeyboardLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
    title?: string
}

const getLayout = (layoutType: LayoutType = LayoutType.Big) => {
    const { layout } = keyboard.layouts.english;

    switch (layoutType) {
        case LayoutType.Big: {
            return {
                default: [
                    "{esc} [F1 F2 F3 F4] [F5 F6 F7 F8] F9 F10 F11 F12",
                    "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
                    "{tab} q w e r t y u i o p [ ] {enter}",
                    "{capslock} a s d f g h j k l ; ' \\ {enter}",
                    "{shift} \\ z x c v b n m , . / {shift}",
                    "{controlleft} {winleft} {altleft} {space} {altright} {winright} {app} {controlright}",
                ],
                shift: [
                    "{esc} [F1 F2 F3 F4] [F5 F6 F7 F8] F9 F10 F11 F12",
                    "~ ! @ # $ % ^ & * ( ) _ + {backspace}",
                    "{tab} Q W E R T Y U I O P { } {enter}",
                    "{capslock} A S D F G H J K L : \" | {enter}",
                    "{shift} | Z X C V B N M < > ? {shift}",
                    "{controlleft} {winleft} {altleft} {space} {altright} {winright} {app} {controlright}",
                ]
            }
        }
        // TODO:
        case LayoutType.MacOs: {
            layout.default[4] = '{controlleft} {altleft} {metaleft} {space} {metaright} {altright} {app} {controlright}'

            return layout;
        }

        default: {
            return layout;
        }
    }

}

const keyboard = new SimpleKeyboardLayouts();

const layout = getLayout(LAYOUT_TYPE)

export const KeyboardLayout = observer((props: KeyboardLayoutProps) => {
    const [input, setInput] = useState("");
    const [layoutName, setLayoutName] = useState('default');
    const keyboard = useRef<SimpleKeyboard>();

    const onChange = (input: string) => {
        //keymappingsStore.keys = input.split('')
        console.log(keymappingsStore.children);
        setInput(input);
    };

    const handleShift = () => {
        const newLayoutName = layoutName === "default" ? "shift" : "default";
        setLayoutName(newLayoutName);
    };

    const onKeyPress = (button: string) => {
        if (button === '{backspace}') {
            keymappingsStore.pop()
        } else {
            keymappingsStore.push(button)
        }

        // Handle the shift and caps lock buttons.
        if (button === '{shift}' || button === '{lock}') handleShift();
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        onChange(input);
        keyboard.current?.setInput(input);
    };

    return (
        <div className={cx('KeyboardLayout', props.className)}>
            <span className={cx('KeyboardLayout__Title')}>{props.title ?? 'Title'}</span>
            <input
                value={input}
                placeholder={"Tap on the virtual keyboard to start"}
                onChange={onChangeInput}
                className={cx('KeyboardLayout__Input')}
            />
            <Keyboard
                keyboardRef={(r: SimpleKeyboard) => (keyboard.current = r)}
                theme={"hg-theme-default hg-layout-default myTheme"}
                layoutName={layoutName}
                layout={layout}
                display={DISPLAY}
                onChange={onChange}
                onKeyPress={onKeyPress}
                buttonTheme={[
                    {
                        class: cx("hg-red"),
                        buttons: "W E R T Y q w e r t y"
                    },
                    {
                        class: cx("hg-highlight"),
                        buttons: "Q q"
                    },
                    {
                        class: cx('hg-chord'),
                        buttons: keymappingsStore.childrenFormatted
                    },
                ]}
            />
        </div>
    );
});
