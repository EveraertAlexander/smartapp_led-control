import { StyleSheet } from 'react-native';
import { neutral } from '../colors/theme';

export const textInput = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: neutral[500],
        borderRadius: 20,
        marginBottom: 16,
        paddingHorizontal: 20,
        color: neutral[100]
    }
})