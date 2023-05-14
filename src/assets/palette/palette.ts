export const palette = {
    green: 'hsl(137, 66%, 34%)',
    darkGreen: 'hsl(137, 66%, 30%)',
    white: 'hsl(0, 0%, 100%)',
    gray: 'hsl(210, 29%, 97%)',
    blueGray: 'hsl(214, 20%, 93%)',
    black: 'hsl(213, 13%, 14%)',
    iceBlue: 'hsl(210, 18%, 84%)',
    blue: 'hsl(212, 92%, 45%)',
}

export const semanticPalette = {
    primary: palette.white,
    secondary: palette.gray,

    hover: palette.blueGray,

    vague: 'hsla(0, 0%, 100%, .4)',

    emphasizing: palette.iceBlue,

    informational: {
        primary: palette.black,
        secondary: palette.gray,
    },

    contrasting: palette.green,
    contrastingHover: palette.darkGreen,
    contrasting2: palette.blue,
}
