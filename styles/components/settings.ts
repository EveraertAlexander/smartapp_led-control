import { StyleSheet } from 'react-native';
import { neutral } from '../colors/theme';

export const settings = StyleSheet.create({
    header : {
        fontSize: 24,
        color: neutral[100],
        fontFamily: 'Raleway-Medium',
    },

    listItemContainer: {
        borderBottomColor: neutral[700],
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        marginTop: 16,
        paddingBottom: 8,
    },

    listItemText: {
        fontSize: 20,
        color: neutral[100]
    },

    listItemSubText: {
        fontSize: 16,
        color: neutral[400]
    }
})