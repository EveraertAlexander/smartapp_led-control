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
        paddingVertical: 30,
        marginBottom: 16,
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
        color: neutral[300],
        fontSize: 16
    },
})

export const page = StyleSheet.create({
    row: {
        marginHorizontal: 16
    },

    title: {
        fontSize: 24,
        color: neutral[100],
        fontFamily: 'Raleway-Medium',
        marginBottom: 16
    }
})
