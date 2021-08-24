import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "../../styles/colors/theme";
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
        headerStyle: { backgroundColor: theme.neutral },
      }}
    >
        <Stack.Screen name="ThemesOverview" component={ThemesOverview}/>
        <Stack.Screen name="Edit Theme" component={EditTheme}/>
        <Stack.Screen name="Add Color" component={AddColor}/>
    </Stack.Navigator>
  );
};

export default Themes;
