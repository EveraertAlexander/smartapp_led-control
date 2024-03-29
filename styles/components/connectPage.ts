import { StyleSheet } from 'react-native';
import { neutral } from '../colors/theme';

export const connectPage = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
        padding: 16
    },

    headerContainer: {
        
        alignItems: 'center'
    },
    header: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'Raleway-Bold',
        color: neutral[100],
        marginBottom: 30
    },

    logo: {
        width: 100,
        height: 100,
        marginBottom: 16
    }
})