import { StyleSheet } from 'react-native';
import { neutral } from '../colors/theme';

export const colorItem = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },

    colorInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    colorText: {
        fontSize: 16,
        fontFamily: 'Raleway-Medium',
        marginLeft: 16,
        color: neutral[200]
    }
})