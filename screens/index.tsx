import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import React, { useEffect } from "react";
import ConnectPage from "./ConnectPage";
import LedControl from "./LedControl";
import { NavigationContainer } from "@react-navigation/native";
import { ledConfig, palettes } from "../utils/db";
import { connect } from "react-redux";
import { SQLResultSet, SQLResultSetRowList } from "expo-sqlite";
import { LedConfig } from "../models/ledConfig";
import { ColorPalette } from "../models/palette";

const Stack = createStackNavigator();

const config: StackNavigationOptions = {
  title: "Theme",
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
};

const Index = ({
  previousConnections,
  updatePreviousConnections,
  savedThemes,
  updateSavedThemes
}: {
  previousConnections?: string;
  updatePreviousConnections?: any;
  savedThemes?: ColorPalette[];
  updateSavedThemes?: any;
}) => {
  const getLedConfig = async () => {
    const { rows }: { rows: SQLResultSetRowList } = await ledConfig.read.all();
    updatePreviousConnections((rows as any)._array);
  };

  const getPalettes = async () => {
    const themes: ColorPalette[] = await palettes.read.allPalettes();
    updateSavedThemes([...themes])
  }

  useEffect(() => {
    getLedConfig();
    getPalettes();
  }, []);

  
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Connect" component={ConnectPage} options={config} />
        <Stack.Screen name="Main" component={LedControl} options={config}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: any) => {
  return {
    ipAddress: state.ipAddress,
    previousConnections: state.previousConnections,
    savedThemes: state.savedThemes
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateIpAddress: (addr: string) =>
      dispatch({ type: "UPDATE_IPADDRESS", payload: addr }),
    updatePreviousConnections: (config: LedConfig[]) =>
      dispatch({ type: "UPDATE_PREVIOUSCONNECTIONS", payload: config }),
    updateSavedThemes: (themes: ColorPalette[]) =>
      dispatch({type: "UPDATE_SAVEDTHEMES", payload: themes})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
