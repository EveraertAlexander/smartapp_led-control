import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SQLResultSet, SQLResultSetRowList } from "expo-sqlite";

//icons
import { MaterialIcons } from "@expo/vector-icons";

//components
import MasterControl from "./MasterControl";
import Themes from "./Themes";
import Settings from "./Settings";

//styles
import { background, neutral } from "../styles/colors/theme";
import { initLastSettings, initLedConfig, ledConfig } from "../utils/db";
import { LedConfig } from "../models/ledConfig";

import { connect } from "react-redux";
import ConnectPage from "./ConnectPage";
import { validateIp } from "../utils/validation";

const Tab = createBottomTabNavigator();

function LedControl({previousConnections, updatePreviousConnections}: {previousConnections?: string, updatePreviousConnections?: any}) {
  const [config, setConfig] = useState<LedConfig[]>();
  const [lastSettings, setLastSettings] = useState();

  const [hasConfig, setHasConfig] = useState<Boolean>(false);

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



  // if (!validateIp(props.ipAddress)) {
  //   return <ConnectPage />;
  // } else {
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
            <Tab.Screen name="MasterControl" component={MasterControl} />
            <Tab.Screen name="Themes" component={Themes} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
      </SafeAreaProvider>
    );
  }
// }

const mapStateToProps = (state: any) => {
  return {
    ipAddress: state.ipAddress,
    previousConnections: state.previousConnections
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateIpAddress: (addr: string) =>
      dispatch({ type: "UPDATE_IPADDRESS", payload: addr }),
    updatePreviousConnections : (config: LedConfig[]) =>
      dispatch({type: "UPDATE_PREVIOUSCONNECTIONS", payload: config})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LedControl);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
