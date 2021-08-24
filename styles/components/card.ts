import { StyleSheet } from 'react-native';
import { neutral } from '../colors/theme';

export const card = StyleSheet.create({
    body: {
        backgroundColor: neutral[800],
        borderRadius: 16,
        padding: 16,
        paddingBottom: 16,
        marginBottom: 30,
    },
    title: {
        fontSize: 24, 
        fontFamily: 'Raleway-Medium',
        color: neutral[100],
        marginBottom: 16
    }
})