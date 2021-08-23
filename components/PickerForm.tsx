import React, { useEffect, useState } from "react";
import { View, Text, ColorValue, processColor, StyleSheet } from "react-native";
import { app, forms } from "../styles/generic";
import { Picker } from "@react-native-picker/picker";
import { background, theme } from "../styles/colors/theme";
import { Color } from "react-native-svg";
import RNPickerSelect, { PickerStyle } from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";
import { Param } from "../models/param";
import { APIError, handleData } from "../utils/dataAccess";
import { pickerSelectStyles } from "../styles/components/picker";
import { lastSettings } from "../utils/db";

export const PickerForm = function ({
  type,
  items,
  style,
}: {
  type: Param;
  items: any;
  style?: any;
}) {
  const placeholder = {
    label: `Select ${type.title}`,
    value: null,
    color: "#9EA0A4",
  };

  const [selectedAnimation, setSelectedAnimation] = useState<any>({key: 0});

  const checkUpdate = (jsonObject: any) => {};

  const updateParam = (val: any) => {
    type.currentValue = val;

    lastSettings.upsert(type);

    handleData(
      `http://192.168.0.99/setparam?key=${type.key}&value=${val}`,
      checkUpdate,
      APIError
    );
  };

  useEffect(() => {
    console.log("items", items);
  }, []);

  return (
    <View style={[app.row, style]}>
      <Text style={forms.title}>{type.title}</Text>
      <View style={{ width: "50%" }}>
        <RNPickerSelect
          fixAndroidTouchableBug={true}
          placeholder={placeholder}
          items={items}
          onValueChange={(value, index) => {
            if (value) {
              setSelectedAnimation(value);
              updateParam(value);
            }
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
