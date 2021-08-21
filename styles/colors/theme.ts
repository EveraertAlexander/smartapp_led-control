import { StyleSheet } from 'react-native';

export const neutral = {
    100: '#FFFFFF',
    600: '#939393',
    700: '#707070',
    800: '#656565',
    900: '#151515',
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
        green: '#14CB00'
    }
}