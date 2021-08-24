import { StyleSheet } from 'react-native';
import { background, theme } from '../colors/theme';

export const button = StyleSheet.create({
    button: {
        backgroundColor: theme.dark,
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 8,
    },

    redButton: {
        padding: 8,
        borderRadius: 8,
        borderColor: background.states.red,
        borderWidth: 1,
        alignItems: 'center',
        // marginHorizontal: 8,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontFamily: 'Raleway-Medium'
    },

    redButtonText: {
        color: background.states.red,
        fontSize: 16,
        fontFamily: 'Raleway-Medium'
    }
})

export const floatingButton = StyleSheet.create({
    body: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: theme.neutral,
        borderRadius: 30
    }
})