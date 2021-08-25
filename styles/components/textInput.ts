import { StyleSheet } from 'react-native';
import { neutral } from '../colors/theme';

export const textInput = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: neutral[700],
        borderRadius: 20,
        marginBottom: 16,
        paddingHorizontal: 20,
        color: neutral[100],
    },

    label : {
        fontSize: 16,
        fontFamily: 'Raleway-Regular',
        marginBottom: 8,
        color: neutral[300]
    }
})