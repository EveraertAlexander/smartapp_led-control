import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Alert, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConnectionStatus } from "../../components/connectionStatus";
import { Header } from "../../components/Header";
import { PickerForm } from "../../components/PickerForm";
import SliderForm from "../../components/SliderForm";
import { PickerItem } from "../../models/pattern";
import { background } from "../../styles/colors/theme";
import { header } from "../../styles/components/header";
import { app } from "../../styles/generic";
import { APIError, handleData } from "../../utils/dataAccess";
import { params } from "../../data/params";
import { initLedConfig, lastSettings } from "../../utils/db";
import { connect } from "react-redux";
import { SQLResultSet, SQLResultSetRowList } from "expo-sqlite";

const Overview = function ({
  navigation,
  ipAddress,
  connected,
  updateConnectionState,
}: any) {
  const [patternLabels, setPatternLabels] = useState<PickerItem[]>([]);
  const [paletteLabels, setPaletteLabels] = useState<PickerItem[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [connected, setConnected] = useState(false);

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Oops!",
      "Could not connect to the led strip. Try again?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => getPatterns() },
      ],
      { cancelable: false }
    );

  const storePatterns = (jsonObject: any) => {
    let _patterns: PickerItem[] = [];
    updateConnectionState(true);

    if (jsonObject.names) {
      for (var key of Object.keys(jsonObject.names as Object)) {
        _patterns.push({ label: jsonObject.names[key], value: key, key: key });
      }
    }

    setPatternLabels(_patterns);
  };

  const storePalettes = (jsonObject: any) => {
    let _palettes = [];

    if (jsonObject.palettes) {
      for (var key of Object.keys(jsonObject.palettes)) {
        _palettes.push({ label: jsonObject.palettes[key].name, value: key });
      }
    }

    setPaletteLabels(_palettes);
  };

  const notConnected = () => {
    updateConnectionState(false);
    setRefreshing(false);
    createTwoButtonAlert();
  };

  const getPatterns = () => {
    handleData(
      `http://192.168.0.99/getpatternsources`,
      storePatterns,
      notConnected
    );
  };

  const getPalettes = () => {
    handleData(`http://192.168.0.99/getpalettes`, storePalettes, notConnected);
  };

  const getLastSettings = async () => {
    const { rows }: { rows: SQLResultSetRowList } =
      await lastSettings.read.all();

    const res = (rows as any)._array;

    console.log(res);

    res.map((r: any) => {
      Object.keys(params).map((k) => {
        if (r.id == params[k as keyof typeof params].key) {
          params[k as keyof typeof params].currentValue = r.value;
        }
      });
    });

    console.log("NIEUWE PARAMS MATTIE", params);
  };

  const connectionSuccessful = (obj: any) => {
    updateConnectionState(true);
    setRefreshing(false);
    getLastSettings();
    getPatterns();
    getPalettes();
  };

  const tryConnection = () => {
    handleData(
      `http://${ipAddress}/getpatternsources`,
      connectionSuccessful,
      notConnected
    );
  };

  const onRefresh = () => {
    setRefreshing(true);

    tryConnection();
  }
  

  useEffect(() => {
    console.log("HET IP ADRES MATJE", ipAddress);
    updateConnectionState(false);
    tryConnection();
  }, [ipAddress]);

  return (
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={[background.neutral[1000], { flex: 1 }]}>
        <View style={app.section}>
          <Header />
          <ConnectionStatus connected={connected} ipAddress={ipAddress} />
        </View>
        <View style={app.section}>
          <PickerForm
            type={params.primaryPattern}
            items={patternLabels}
            style={{ marginBottom: 30 }}
          />
          <SliderForm
            style={{ marginBottom: 30 }}
            type={params.primarySpeed}
            iconName="speed"
          />
          <SliderForm type={params.primaryScale} iconName="fullscreen" />
        </View>
        <View style={app.section}>
          <PickerForm
            type={params.palette}
            items={paletteLabels}
            style={{ marginBottom: 30 }}
          />
          <SliderForm
            style={{ marginBottom: 30 }}
            type={params.masterBrightness}
            iconName="brightness-6"
          />
          <SliderForm
            style={{ marginBottom: 30 }}
            type={params.masterColorTemp}
            iconName="device-thermostat"
          />
          <SliderForm type={params.masterSaturation} iconName="invert-colors" />
        </View>
      </ScrollView>
  
  );
};

const mapStateToProps = (state: any) => {
  return {
    ipAddress: state.ipAddress,
    connected: state.connected,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateConnectionState: (con: boolean) =>
      dispatch({ type: "UPDATE_CONNECTIONSTATE", payload: con }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
