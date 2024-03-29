import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStore } from "redux";
import { Provider } from "react-redux";
import LedControl from "./screens/LedControl";
import { useFonts } from "expo-font";
import Index from "./screens";
import { params } from "./data/params";
import { initColors, initLastSettings, initLedConfig, initPalettes } from "./utils/db";

const initialState = {
  ipAddress: null,
  connected: false,
  latestSettings: params,
  previousConnections : null,
  savedThemes: null,
  editingTheme: null,
};

const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case "UPDATE_IPADDRESS":
      return {...state, ipAddress: action.payload}
    case "UPDATE_CONNECTIONSTATE":
      return {...state, connected: action.payload}
    case "UPDATE_PREVIOUSCONNECTIONS":
      return {...state, previousConnections: action.payload}
    case "UPDATE_SAVEDTHEMES":
      return {...state, savedThemes: action.payload}
    case "UPDATE_EDITINGTHEME":
      return {...state, editingTheme: action.payload}
    case "UPDATE_LATESTSETTINGS":
      return {...state, latestSettings: action.payload}
  }
  return state;
};

const store = createStore(reducer);

export default function App() {
  let [fontsLoaded] = useFonts({
    "Raleway-Regular": require("./assets/fonts/Raleway-Regular.ttf"),
    "Raleway-Medium": require("./assets/fonts/Raleway-Medium.ttf"),
    "Raleway-Bold": require("./assets/fonts/Raleway-Bold.ttf"),
  });

  useEffect(() => {
    initLedConfig();
    initLastSettings();
    initPalettes();
    initColors();
  }, [])

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  } else {
    return <Text>Hallokes</Text>;
  }
}
