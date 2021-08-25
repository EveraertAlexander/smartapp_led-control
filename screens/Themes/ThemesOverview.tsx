import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import PageLayout from "../../components/PageLayout";
import { Color, ColorPalette } from "../../models/palette";
import { page } from "../../styles/generic";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../styles/colors/theme";
import { card } from "../../styles/components/card";
import FloatingButton from "../../components/FloatingButton";
import Svg, { Circle } from "react-native-svg";
import { hsvToHex } from "../../utils/colorConversion";

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

  return (
    <View style={{ flex: 1 }}>
      <PageLayout>
        <Text style={page.title}>My Themes</Text>
        <View>
          {savedThemes && savedThemes.length != 0
            ? savedThemes.map((t) => {
                return (
                  <TouchableOpacity
                    style={[
                      card.body,
                      {
                        marginBottom: 16,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                    ]}
                    key={t.id}
                    onPress={() => {
                      handleOnPress(t);
                    }}
                  >
                    <View>
                      <Text style={[card.smallTitle, {marginBottom: 8}]}>{t.name}</Text>
                      <View style={{flexDirection: "row"}}>
                        {t.colors && t.colors.length != 0
                          ? t.colors.map((c: Color) => {
                              return (
                                <Svg
                                  style={{ marginRight: 8 }}
                                  height="20"
                                  width="20"
                                  key={c.colorId}
                                >
                                  <Circle
                                    cx="10"
                                    cy="10"
                                    r="10"
                                    fill={`${hsvToHex(c.h, c.s, c.v)}99`}
                                  />
                                </Svg>
                              );
                            })
                          : null}
                      </View>
                    </View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color={theme.dark}
                    />
                  </TouchableOpacity>
                );
              })
            : <Text style={page.subtitle}>Add a theme by pressing the "+" icon</Text>}
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
