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
import { app, page } from "../../styles/generic";
import { initColors, initPalettes, palettes } from "../../utils/db";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../styles/colors/theme";
import { card } from "../../styles/components/card";
import FloatingButton from "../../components/FloatingButton";

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
    navigation.navigate("Edit Theme", { newTheme: true });
  };

  const handleOnPress = (t: ColorPalette) => {
    updateEditingTheme(t);
    navigation.navigate("Edit Theme", { newTheme: false });

    // console.log(t);
  };

  useEffect(() => {
    initColors();
    initPalettes();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <PageLayout>
        <Text style={page.title}>My Themes</Text>
        <View>
          {savedThemes
            ? savedThemes.map((t) => {
                return (
                  // <TouchableOpacity
                  //   style={settings.listItemContainer}
                  //   key={t.id}
                  //   onPress={() => {
                  //     handleOnPress(t);
                  //   }}
                  // >
                  //   <Text style={settings.listItemText}>{t.name}</Text>
                  //   <MaterialIcons
                  //     name="keyboard-arrow-right"
                  //     size={24}
                  //     color={theme.dark}
                  //   />
                  // </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      card.body,
                      {
                        marginBottom: 16,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                      },
                    ]}
                    key={t.id}
                    onPress={() => {
                      handleOnPress(t);
                    }}
                  >
                    <Text style={card.smallTitle}>{t.name}</Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color={theme.dark}
                    />
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
      </PageLayout>
        <FloatingButton onButtonPress={handleAddPalette} />
    </View>
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
