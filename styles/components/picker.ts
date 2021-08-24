import { StyleSheet } from 'react-native';
import { theme } from '../colors/theme';

export const pickerSelectStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30
    },
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 4,
      color: "black",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 2,
      borderWidth: 0.5,
      borderColor: theme.dark,
      borderRadius: 8,
      color: "white",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });