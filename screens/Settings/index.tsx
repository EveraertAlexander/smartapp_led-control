import { createStackNavigator } from "@react-navigation/stack";
import {
  StackNavigationOptions,
} from "@react-navigation/stack/lib/typescript/src/types";
import React from "react";
import { neutral } from "../../styles/colors/theme";
import AddConnection from "./AddConnection";
import EditConnection from "./EditConnection";
import SettingsHome from "./SettingsHome";
import { CardStyleInterpolators } from "@react-navigation/stack";

const Stack = createStackNavigator();

const config: StackNavigationOptions = {
  title: "Settings",
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
};

const Settings = function ({ navigation }: any) {

  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: neutral[700] },
      }}
    >
      <Stack.Screen name="Settings" component={SettingsHome} options={config} />
      <Stack.Screen
        name="Edit Connection"
        component={EditConnection}
        options={config}
      />
      <Stack.Screen
        name="Add Connection"
        component={AddConnection}
        options={config}
      />
    </Stack.Navigator>
  );
};

export default Settings;
