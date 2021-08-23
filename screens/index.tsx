import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import ConnectPage from "./ConnectPage";
import LedControl from "./LedControl";
import { NavigationContainer } from "@react-navigation/native";
import { initLastSettings, initLedConfig, ledConfig } from "../utils/db";
import { connect } from "react-redux";
import { SQLResultSet, SQLResultSetRowList } from "expo-sqlite";
import { LedConfig } from "../models/ledConfig";

const Stack = createStackNavigator();

const Index = ({
  previousConnections,
  updatePreviousConnections,
}: {
  previousConnections?: string;
  updatePreviousConnections?: any;
}) => {
  const getLedConfig = async () => {
    const { rows }: { rows: SQLResultSetRowList } = await ledConfig.read.all();
    console.log("testjeeeee", (rows as any)._array);

    updatePreviousConnections((rows as any)._array);
  };

  useEffect(() => {
    initLedConfig();
    initLastSettings();
    getLedConfig();
  }, []);

  
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Connect" component={ConnectPage} />
        <Stack.Screen name="Main" component={LedControl} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: any) => {
  return {
    ipAddress: state.ipAddress,
    previousConnections: state.previousConnections,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateIpAddress: (addr: string) =>
      dispatch({ type: "UPDATE_IPADDRESS", payload: addr }),
    updatePreviousConnections: (config: LedConfig[]) =>
      dispatch({ type: "UPDATE_PREVIOUSCONNECTIONS", payload: config }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
