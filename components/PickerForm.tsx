import React, { useEffect, useState } from "react";
import { View, Text, ColorValue, processColor, StyleSheet } from "react-native";
import { app, forms } from "../styles/generic";
import { Picker } from "@react-native-picker/picker";
import { background, neutral, theme } from "../styles/colors/theme";
import { Color } from "react-native-svg";
import RNPickerSelect, { PickerStyle } from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";
import { Param, Params } from "../models/param";
import { APIError, handleData } from "../utils/dataAccess";
import { pickerSelectStyles } from "../styles/components/picker";
import { lastSettings } from "../utils/db";
import { connect } from "react-redux";

const PickerForm = function ({
  type,
  items,
  style,
  ipAddress,
  latestSettings
}: {
  type: Param;
  items: any;
  style?: any;
  ipAddress?: string,
  latestSettings: Params
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
      `http://${ipAddress}/setparam?key=${type.key}&value=${val}`,
      checkUpdate,
      APIError
    );
  };


  return (
    <View style={[pickerSelectStyles.container, style]}>
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
              <MaterialIcons name="arrow-drop-down" size={24} color={neutral[200]} />
            );
          }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    ipAddress: state.ipAddress,
    connected: state.connected,
    savedThemes: state.savedThemes,
    latestSettings: state.latestSettings
  };
};

export default connect(mapStateToProps)(PickerForm)