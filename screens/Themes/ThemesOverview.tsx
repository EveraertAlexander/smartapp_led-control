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

    navigation.navigate("Edit Theme", {newTheme: true})
  };

  const handleOnPress = (t: ColorPalette) => {
    updateEditingTheme(t)
    navigation.navigate("Edit Theme", {newTheme: false})

    // console.log(t);
  };

  useEffect(() => {
    initColors();
    initPalettes();
  }, []);
  return (
    <PageLayout>
      <Text style={[settings.header, {marginBottom: 16}]}>My Themes</Text>
      <View style={app.card}>
        <View>
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
