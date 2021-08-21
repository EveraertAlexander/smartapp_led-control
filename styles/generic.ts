import { StyleSheet } from 'react-native';
import { background, neutral } from './colors/theme';

export const app = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 50
    },
    section: {
        borderBottomColor: neutral[600],
        borderBottomWidth: 1,
        paddingVertical: 30
    },

    row: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export const forms = StyleSheet.create({
    title: {
        fontFamily: 'Raleway-Medium',
        color: '#FFF',
        fontSize: 18
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
})
