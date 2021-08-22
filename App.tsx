import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStore } from "redux";
import { Provider } from "react-redux";
import LedControl from "./screens/LedControl";
import { useFonts } from "expo-font";

const initialState = {
  ipAddress: null,
  connected: false
};

const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case "UPDATE_IPADDRESS":
      return {...state, ipAddress: action.payload}
    case "UPDATE_CONNECTIONSTATE":
      
      return {...state, connected: action.payload}
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
        <LedControl />
      </Provider>
    );
  } else {
    return <Text>Hallokes</Text>;
  }
}
