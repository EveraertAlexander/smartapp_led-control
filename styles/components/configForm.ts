import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { background, theme } from '../colors/theme';


export const configForm = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        
    },

    header: {
        fontSize: 24,
        fontWeight: '500',
        color: '#FFF',
        marginBottom: 12,

    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        color: '#FFF'
    },

    savedSection: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },

    savedSectionText: {
        color: '#FFF'
    },

    input: {
        height: 40,
        borderWidth: 1,
        borderColor: theme.neutral,
        padding: 10,
        borderRadius: 4,
        color: '#FFF',
        marginBottom: 16,
    },

    button: {
        width: 'auto',
        backgroundColor: theme.dark,
        padding: 8,
        borderRadius: 8,
        alignItems: 'center'
    },

    buttonText: {
        color: "#FFF",
        fontSize: 20,
    }

}
)