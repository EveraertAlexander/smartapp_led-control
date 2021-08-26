import { StyleSheet } from 'react-native';

export const neutral = {
    100: '#F8F5FC',
    200: '#EAE4F2',
    300: '#C7BED1',
    400: '#A399B0',
    500: '#8E839C',
    600: '#6F637D',
    700: '#433A4D',
    800: '#282130',
    900: '#140D1C',
    1000: '#09040F',
};


export const theme = {
    dark: '#BB86FCCC',
    neutral: '#BB86FC',
    alpha: '#7B32D9',
    beta: '#F4649F',
    gamma: '#24124B',
    delta: '#F4D2E0'
}

export const background = {
    neutral: StyleSheet.create({
        100: {
            backgroundColor: neutral[100]
        },
        200: {
            backgroundColor: neutral[200]
        },
        300: {
            backgroundColor: neutral[300]
        },
        400: {
            backgroundColor: neutral[400]
        },
        500: {
            backgroundColor: neutral[500]
        },
        600: {
            backgroundColor: neutral[600]
        },
        700: {
            backgroundColor: neutral[700]
        },
        800: {
            backgroundColor: neutral[800]
        },
        900: {
            backgroundColor: neutral[900]
        },
        1000: {
            backgroundColor: neutral[1000]
        },
    }),
    theme: {
        // ...
    },

    states: {
        green: '#14CB00',
        red: '#d90b0b'
    }
}