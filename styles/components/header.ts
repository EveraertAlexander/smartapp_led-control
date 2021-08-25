
import { StyleSheet } from 'react-native';
import { neutral } from '../colors/theme';

export const header = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    logo: {
        color: neutral[100],
        fontFamily: 'Raleway-Bold',
        fontSize: 24
    }
})