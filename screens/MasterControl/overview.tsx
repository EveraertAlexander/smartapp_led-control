import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConnectionStatus } from "../../components/connectionStatus";
import { Header } from "../../components/Header";
import { PickerForm } from "../../components/PickerForm";
import { SliderForm } from "../../components/SliderForm";
import { PickerItem } from "../../models/pattern";
import { background } from "../../styles/colors/theme";
import { header } from "../../styles/components/header";
import { app } from "../../styles/generic";
import { handleData } from "../../utils/dataAccess";
import { params } from "../../data/params";

const Overview = function ({ navigation }: any) {
  const [patternLabels, setPatternLabels] = useState<PickerItem[]>([]);
  const [paletteLabels, setPaletteLabels] = useState<PickerItem[]>([]);

  const storePatterns = (jsonObject: any) => {
    let _patterns = [];

    if (jsonObject.names) {
      for (var key of Object.keys(jsonObject.names)) {
        _patterns.push({ label: jsonObject.names[key], value: key });
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

  const getPatterns = () => {
    handleData(`http://192.168.0.99/getpatternsources`, storePatterns);
  };

  const getPalettes = () => {
    handleData(`http://192.168.0.99/getpalettes`, storePalettes);
  };

  useEffect(() => {
    getPatterns();
    getPalettes();
  }, []);

  return (
    <SafeAreaView style={[background.neutral[1000], { flex: 1 }]}>
      <ScrollView>
        <View style={app.section}>
          <Header />
          <ConnectionStatus />
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
    </SafeAreaView>
  );
};

export default Overview;
