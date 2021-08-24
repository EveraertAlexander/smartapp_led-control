import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  ColorPicker,
  fromHsv,
  TriangleColorPicker,
} from "react-native-color-picker";
import { connect } from "react-redux";
import Button from "../../components/Button";
import PageLayout from "../../components/PageLayout";
import { LedConfig } from "../../models/ledConfig";
import { ColorPalette } from "../../models/palette";
import { settings } from "../../styles/components/settings";
import { app } from "../../styles/generic";
import { initColors, initPalettes, palettes } from "../../utils/db";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../styles/colors/theme";

const ThemesOverview = ({
  savedThemes,
  navigation,
  updateEditingTheme,
}: {
  savedThemes: ColorPalette[];
  navigation: any;
  updateEditingTheme: any;
}) => {
  const handleAddPalette = async () => {
    // const palette: ColorPalette = {
    //   id: 1629793619445,
    //   name: "Naam is aangepast mattie",
    //   colors: [
    //     {
    //       h: 0.680555555,
    //       s: 0.8,
    //       v: 0.81,
    //     },
    //     {
    //       h: 1,
    //       s: 1,
    //       v: 1,
    //     },
    //     // {
    //     //   h: 2,
    //     //   s: 2,
    //     //   v: 2,
    //     // },
    //   ],
    // };

    // // await palettes.create.palette(palette);
    // await palettes.update(palette);
    // // console.log(res);

    // // const res = await palettes.delete(1629793084258)

    // const res2 = await palettes.read.allPalettes();

    // console.log(res2);

    // // navigation.navigate("Edit Theme");
  };

  const handleOnPress = (t: ColorPalette) => {
    navigation.navigate("Edit Theme")
    updateEditingTheme(t)

    // console.log(t);
  };

  useEffect(() => {
    initColors();
    initPalettes();
  }, []);
  return (
    <PageLayout>
      <Text style={settings.header}>My Themes</Text>
      <View style={app.card}>
        <View style={{ height: 300 }}>
          {savedThemes
            ? savedThemes.map((t) => {
                return (
                  <TouchableOpacity
                    style={settings.listItemContainer}
                    key={t.id}
                    onPress={() => {
                      handleOnPress(t);
                    }}
                  >
                    <Text style={settings.listItemText}>{t.name}</Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color={theme.dark}
                    />
                  </TouchableOpacity>
                );
              })
            : null}
          <Button onButtonPress={handleAddPalette} style={{ marginTop: 16 }}>
            Add Theme
          </Button>
        </View>
      </View>
    </PageLayout>
  );
};

const mapStateToProps = (state: any) => {
  return {
    savedThemes: state.savedThemes,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateEditingTheme: (t: ColorPalette) =>
      dispatch({ type: "UPDATE_EDITINGTHEME", payload: t }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemesOverview);
