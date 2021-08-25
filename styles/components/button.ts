import { StyleSheet } from 'react-native';
import { background, neutral, theme } from '../colors/theme';

export const button = StyleSheet.create({
    body: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
        backgroundColor: theme.alpha,
        alignItems: 'center',
    },

    text: {
        color: neutral[100],
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

export const deleteButton = StyleSheet.create({
    body: {
        padding: 8,
        borderRadius: 16,
        borderColor: background.states.red,
        borderWidth: 1,
        alignItems: 'center',
    },

    text: {
        color: background.states.red,
        fontSize: 16,
        fontFamily: 'Raleway-Medium'
    }
})