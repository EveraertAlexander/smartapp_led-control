import React, { useState } from "react";
import { View, Text, ColorValue, processColor, StyleSheet } from "react-native";
import { app, forms } from "../styles/generic";
import { Picker } from "@react-native-picker/picker";
import { background, theme } from "../styles/colors/theme";
import { Color } from "react-native-svg";
import RNPickerSelect, { PickerStyle } from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";
import { Param } from "../models/param";
import { handleData } from "../utils/dataAccess";

export const PickerForm = function ({type, items, style} : {type: Param, items: any, style?: any}) {
  



  const placeholder = {
    label: `Select ${type.title}`,
    value: null,
    color: "#9EA0A4",
  };

  const [selectedAnimation, setSelectedAnimation] = useState();

  const checkUpdate = (jsonObject: any) => {

  }
  

  const updateParam = (value: any) => {
      handleData(`http://192.168.0.99/setparam?key=${type.key}&value=${value}`, checkUpdate)
      
  }
  

  return (
    <View style={[app.row, style]}>
      <Text style={forms.title}>{type.title}</Text>
      <View style={{ width: "50%" }}>
        <RNPickerSelect
          placeholder={placeholder}
          items={items}
          onValueChange={(value) => {
            setSelectedAnimation(value);
            updateParam(value);
          }}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              right: 5,
              top: 4,
            },
          }}
          value={selectedAnimation}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return (
              <MaterialIcons name="arrow-drop-down" size={24} color="white" />
            );
          }}
        />
      </View>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
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
