import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { neutral, theme } from "../../styles/colors/theme";
import ThemesOverview from "./ThemesOverview";
import EditTheme from "./EditTheme";
import AddColor from "./AddColor";

const Stack = createStackNavigator();

const Themes = function ({ navigation }: any) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: neutral[700] },
      }}
    >
        <Stack.Screen name="Themes" component={ThemesOverview} options={{ title: 'Theme' }}/>
        <Stack.Screen name="Edit Theme" component={EditTheme} options={{ title: 'Theme' }}/>
        <Stack.Screen name="Add Color" component={AddColor} options={{ title: 'Theme' }}/>
    </Stack.Navigator>
  );
};

export default Themes;
