import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStore } from "redux";
import { Provider } from "react-redux";
import LedControl from "./screens/LedControl";
import { useFonts } from "expo-font";
import Index from "./screens";

const initialState = {
  ipAddress: null,
  connected: false,
  previousConnections : null,
};

const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case "UPDATE_IPADDRESS":
      return {...state, ipAddress: action.payload}
    case "UPDATE_CONNECTIONSTATE":
      return {...state, connected: action.payload}
    case "UPDATE_PREVIOUSCONNECTIONS":
      console.log("YO IK WORD GEUPDATE KEREL", action.payload);
      
      return {...state, previousConnections: action.payload}
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
