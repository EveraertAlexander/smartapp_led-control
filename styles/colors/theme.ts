import { StyleSheet } from 'react-native';

export const neutral = {
    100: '#FFFFFF',
    200: '#d1d1d1',
    300: '#bababa',
    400: '#b5b5b5',
    500: '#919191',
    600: '#939393',
    700: '#707070',
    800: '#454545',
    900: '#252525',
    1000: '#000',
};

export const theme = {
    dark: '#BB86FCCC',
    neutral: '#BB86FC'
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
        red: '#c91414'
    }
}