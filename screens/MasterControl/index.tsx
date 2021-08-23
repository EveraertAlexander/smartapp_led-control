import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";

import Overview from "./overview";
import ConnectPage from "../ConnectPage";
import { theme } from "../../styles/colors/theme";

const Stack = createStackNavigator();

const MasterControl = function ({ navigation }: any) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: theme.neutral },
      }}
    >
      {/* <Stack.Screen name = "Connect" component = {ConnectPage}/> */}
      <Stack.Screen name="Overview" component={Overview} />
    </Stack.Navigator>
  );
};

export default MasterControl;
