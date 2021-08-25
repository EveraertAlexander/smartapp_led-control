import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//icons
import { MaterialIcons } from "@expo/vector-icons";

//components
import MasterControl from "./MasterControl";
import Themes from "./Themes";
import Settings from "./Settings";

//styles
import { background, neutral } from "../styles/colors/theme";

const Tab = createBottomTabNavigator();

function LedControl() {

  const customTabOptions = ({ route }: any) => ({
    tabBarIcon: ({ color, size }: any) => {
      let iconName;

      if (route.name === "MasterControl") {
        iconName = "tune";
      } else if (route.name === "Themes") {
        iconName = "palette";
      } else if (route.name === "Settings") {
        iconName = "settings";
      } else {
        iconName = "american-football-sharp";
      }

      //@ts-ignore
      return <MaterialIcons name={iconName} size={size} color={color} />;
    },
  });
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={customTabOptions}
        tabBarOptions={{
          activeTintColor: neutral[100],
          inactiveTintColor: neutral[500],
          style: {
            ...background.neutral[900],
            borderTopWidth: 1,
            borderTopColor: neutral[900],
            height: 60,
          },
          labelStyle: {
            marginBottom: 7,
            fontFamily: "Raleway-Medium",
          },
        }}
      >
        <Tab.Screen
          name="MasterControl"
          component={MasterControl}
          options={{}}
        />
        <Tab.Screen name="Themes" component={Themes} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}


export default LedControl

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
