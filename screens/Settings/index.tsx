import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import { neutral, theme } from "../../styles/colors/theme";
import AddConnection from "./AddConnection";
import EditConnection from "./EditConnection";
import SettingsHome from "./SettingsHome";

const Stack = createStackNavigator();

const Settings = function ({ navigation }: any) {
  return (
    <Stack.Navigator
    headerMode='screen'
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: neutral[700] },
      }}
    >
      <Stack.Screen name="Settings" component={SettingsHome} />
      <Stack.Screen name="Edit Connection" component={EditConnection} />
      <Stack.Screen name="Add Connection" component={AddConnection} />
    </Stack.Navigator>
  );
};

export default Settings;
