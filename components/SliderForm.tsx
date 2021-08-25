import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { app, forms } from "../styles/generic";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { neutral, theme } from "../styles/colors/theme";
import { APIError, handleData } from "../utils/dataAccess";
import { Param } from "../models/param";
import { lastSettings } from "../utils/db";
import { connect } from "react-redux";
import { slider } from "../styles/components/slider";

const SliderForm = function ({
  type,
  iconName,
  updateConnectionState,
  ipAddress
}: {
  type: Param;
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
    <View style={{marginBottom: 30}}>
      <View style={[slider.container]}>
        <Text style={forms.title}>{type.title}</Text>
        <MaterialIcons name={iconName} size={30} color={neutral[200]} />
      </View>
      <Slider
        onValueChange={handleValueChange}
        value={type.currentValue}
        style={{ marginHorizontal: -10 }}
        minimumValue={type.minValue ? type.minValue : 0}
        maximumValue={type.maxValue ? type.maxValue : 1}
        minimumTrackTintColor={theme.delta}
        maximumTrackTintColor={theme.dark}
        thumbTintColor={theme.beta}
        
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
