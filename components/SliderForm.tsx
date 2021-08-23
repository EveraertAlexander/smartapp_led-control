import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { app, forms } from "../styles/generic";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { theme } from "../styles/colors/theme";
import { APIError, handleData } from "../utils/dataAccess";
import { Param } from "../models/param";
import { lastSettings } from "../utils/db";
import { connect } from "react-redux";

const SliderForm = function ({
  type,
  style,
  iconName,
  updateConnectionState,
  connected,
  ipAddress
}: {
  type: Param;
  style?: any;
  iconName: any;
  updateConnectionState?: any;
  connected?: boolean,
  ipAddress?: string
}) {
  const showResult = (e: any) => {
    updateConnectionState(true)
  };

  const handleValueChange = async (e: number) => {
    type.currentValue = e;

    lastSettings.upsert(type);

    let val: number = e;

    if (type.key == "master_color_temp") val = Math.round(e);
    
    handleData(
      `http://${ipAddress}/setparam?key=${type.key}&value=${val}`,
      showResult,
      () => {
        updateConnectionState(false);
        // alert("Oops! Could not connect to the strip");
      }
    );
  };


  return (
    <View style={style}>
      <View style={[app.row]}>
        <Text style={forms.title}>{type.title}</Text>
        <MaterialIcons name={iconName} size={32} color="white" />
      </View>
      <Slider
        onValueChange={handleValueChange}
        value={type.currentValue}
        style={{ height: 40 }}
        minimumValue={type.minValue ? type.minValue : 0}
        maximumValue={type.maxValue ? type.maxValue : 1}
        minimumTrackTintColor={theme.neutral}
        maximumTrackTintColor={theme.dark}
        thumbTintColor={theme.neutral}
      />
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    ipAddress: state.ipAddress,
    connected: state.connected,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateConnectionState: (con: boolean) =>
      dispatch({ type: "UPDATE_CONNECTIONSTATE", payload: con }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SliderForm);
