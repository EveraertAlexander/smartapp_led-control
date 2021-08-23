import { StyleSheet } from 'react-native';
import { background, neutral } from './colors/theme';

export const app = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 50
    },
    section: {
        borderBottomColor: neutral[600],
        borderBottomWidth: 1,
        paddingVertical: 30
    },

    container: {
        paddingVertical: 30,
        paddingHorizontal: 15,
    },

    row: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    card: {
        backgroundColor: neutral[900],
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingBottom: 16

    }
})

export const forms = StyleSheet.create({
    title: {
        fontFamily: 'Raleway-Medium',
        color: '#FFF',
        fontSize: 18
    },
})
