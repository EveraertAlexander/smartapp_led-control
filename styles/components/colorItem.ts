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

export const AddColorItem = StyleSheet.create({
    container: {
        alignItems: 'center',
        // backgroundColor: 'white',
    },

    text: {
        fontSize: 20,
        fontFamily: 'Raleway-Medium',
        color: neutral[200],
        marginTop: 8
        // backgroundColor: 'hotpink',
    }
})