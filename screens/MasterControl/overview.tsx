import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Alert, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConnectionStatus } from "../../components/connectionStatus";
import { Header, SmallHeader } from "../../components/Header";
import PickerForm from "../../components/PickerForm";
import SliderForm from "../../components/SliderForm";
import { PickerItem } from "../../models/pattern";
import { background } from "../../styles/colors/theme";
import { header } from "../../styles/components/header";
import { app, page } from "../../styles/generic";
import { APIError, handleData } from "../../utils/dataAccess";
import { params } from "../../data/params";
import {  lastSettings } from "../../utils/db";
import { connect } from "react-redux";
import { SQLResultSet, SQLResultSetRowList } from "expo-sqlite";
import { Color, ColorPalette } from "../../models/palette";
import { card } from "../../styles/components/card";
import { Params } from "../../models/param";

const Overview = function ({
  navigation,
  ipAddress,
  connected,
  updateConnectionState,
  updateLatestSettings,
  latestSettings,
  savedThemes,
}: {
  navigation: any;
  ipAddress: string;
  connected: boolean;
  updateConnectionState: any;
  savedThemes: ColorPalette[];
  latestSettings: Params;
  updateLatestSettings: any;
}) {
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
      `http://${ipAddress}/getpatternsources`,
      storePatterns,
      notConnected
    );
  };

  const getPalettes = () => {
    handleData(`http://${ipAddress}/getpalettes`, storePalettes, notConnected);
  };

  const callbackSetPalettes = (obj: any) => {
    updateConnectionState(true);
  };

  const setPalettes = () => {
    let _palettes: PickerItem[] = [];

    if (savedThemes) {
      savedThemes.map((theme) => {
        _palettes.push({ label: theme.name, value: theme.id });

        const ColorsToSend = theme.colors.map((c: Color) => {
          return [c.h, c.s, c.v];
        });

        if (ColorsToSend.length == 1) {
          ColorsToSend.push(ColorsToSend[0]);
        }

        const ObjectToSend = {
          colors: ColorsToSend,
          mode: 0,
          name: theme.name,
        };

        handleData(
          `http://${ipAddress}/setpalette?key=${
            theme.id
          }&value=${JSON.stringify(ObjectToSend)}`,
          callbackSetPalettes,
          () => {
            updateConnectionState(false);
          }
        );
      });
    }

    // console.log("Paletten", _palettes);
    setPaletteLabels(_palettes);
  };

  const getLastSettings = async () => {
    const { rows }: { rows: SQLResultSetRowList } =
      await lastSettings.read.all();

    const res = (rows as any)._array;

    console.log(res);

    const _latestSettings: Params = { ...latestSettings };

    res.map((r: any) => {
      Object.keys(params).map((k) => {
        if (r.id == params[k as keyof typeof params].key) {
          _latestSettings[k as keyof typeof params].currentValue = r.value;
          updateLatestSettings({ ..._latestSettings });
        }
      });
    });

    // console.log("NIEUWE PARAMS MATTIE", params);
  };

  const connectionSuccessful = (obj: any) => {
    updateConnectionState(true);
    setRefreshing(false);
    getLastSettings();
    getPatterns();
    setPalettes();
    // getPalettes();
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
  };

  useEffect(() => {
    updateConnectionState(false);
    tryConnection();
  }, [ipAddress]);

  useEffect(() => {
    setPalettes();
  }, [savedThemes]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={[background.neutral[1000], { flex: 1 }]}
    >
      <View style={app.section}>
        <SmallHeader />
        <ConnectionStatus connected={connected} ipAddress={ipAddress} />
      </View>
      <View style={page.row}>
        <View style={card.body}>
          <Text style={card.title}>Animations</Text>
          <PickerForm
            type={latestSettings.primaryPattern}
            items={patternLabels}
          />
          <SliderForm
            type={latestSettings.primarySpeed}
            iconName="speed"
          />
          <SliderForm
            type={latestSettings.primaryScale}
            iconName="fullscreen"
          />
        </View>
        <View style={card.body}>
          <Text style={card.title}>Colors</Text>
          <PickerForm type={latestSettings.palette} items={paletteLabels} />
          <SliderForm
            type={latestSettings.masterBrightness}
            iconName="brightness-6"
          />
          <SliderForm
            type={latestSettings.masterColorTemp}
            iconName="device-thermostat"
          />
          <SliderForm
            type={latestSettings.masterSaturation}
            iconName="invert-colors"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: any) => {
  return {
    ipAddress: state.ipAddress,
    connected: state.connected,
    savedThemes: state.savedThemes,
    latestSettings: state.latestSettings,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateConnectionState: (con: boolean) =>
      dispatch({ type: "UPDATE_CONNECTIONSTATE", payload: con }),
    updateLatestSettings: (settings: Params) =>
      dispatch({ type: "UPDATE_LATESTSETTINGS", payload: settings }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
