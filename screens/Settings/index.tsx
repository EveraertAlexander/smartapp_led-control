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
      <Stack.Screen name="Settings" component={SettingsHome} options={{ title: 'Settings' }}/>
      <Stack.Screen name="Edit Connection" component={EditConnection}  options={{ title: 'Settings' }}/>
      <Stack.Screen name="Add Connection" component={AddConnection} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
};

export default Settings;
