
import { StyleSheet } from 'react-native';
import { neutral } from '../colors/theme';

export const header = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 24
        
    },

    smallContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'Raleway-Bold',
        color: neutral[100],
    },

    logo: {
        width: 100,
        height: 100,
        marginBottom: 16
    },

    smallLogo: {
        marginRight: 16,
        width: 50,
        height: 50
    }
})