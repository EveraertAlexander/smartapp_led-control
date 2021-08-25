import { StyleSheet } from 'react-native';
import { neutral } from '../colors/theme';

export const connectPage = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
        padding: 16
    },
    header: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'Raleway-Bold',
        color: neutral[100],
        marginBottom: 30
    }
})