import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../../components/Button";
import PageLayout from "../../components/PageLayout";
import { Color, ColorPalette } from "../../models/palette";
import { background, neutral } from "../../styles/colors/theme";
import { configForm } from "../../styles/components/configForm";
import { settings } from "../../styles/components/settings";
import { app } from "../../styles/generic";
import { palettes } from "../../utils/db";
import Svg, { Circle } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";

//@ts-ignore
import nearestColor from "nearest-color";
import { getColorName } from "../../utils/nearestColor";
import { hsvToHex } from "../../utils/colorConversion";
import { connect } from "react-redux";

const EditTheme = ({
  navigation,
  editingTheme,
  updateEditingTheme,
  updateSavedThemes,
}: {
  navigation: any;
  editingTheme: ColorPalette;
  updateEditingTheme: any;
  updateSavedThemes: any;
}) => {
  // const [palette, setPalette] = useState<ColorPalette>({
  //   id: Date.now(),
  //   name: "",
  //   colors: [
  //     {
  //       colorId: 28,
  //       h: 0.680555555,
  //       s: 0.8,
  //       v: 0.81,
  //     },
  //     {
  //       colorId: 27,
  //       h: 1,
  //       s: 1,
  //       v: 1,
  //     },
  //   ],
  // });

  // const createTwoButtonAlert = (c: Color) =>
  //   Alert.alert(
  //     "Opgelet",
  //     "Weet je zeker dat je deze kleur wilt verwijderen?",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel",
  //       },
  //       { text: "OK", onPress: () => removeColor(c) },
  //     ],
  //     { cancelable: false }
  //   );

  const handleOnChangeName = (text: string) => {
    updateEditingTheme({ ...editingTheme, name: text });
  };

  const handleAddColor = () => {
    navigation.navigate("Add Color");
  };

  const handleOnSave = async () => {
    await palettes.update({ ...editingTheme });

    const res = await palettes.read.allPalettes();

    updateSavedThemes([...res]);

    navigation.pop();
  };

  const handleRemoveColor = (c: Color) => {
    let updatedColors: Color[] = [];

    editingTheme.colors.map((col: Color) => {
      if (col.colorId == c.colorId) {
        return;
      } else {
        updatedColors.push({ ...col });
      }
    });

    updateEditingTheme({ ...editingTheme, colors: updatedColors });
  };

  return (
    <PageLayout>
      <Text style={[settings.header, { marginBottom: 16 }]}>Edit Theme</Text>
      <Text style={configForm.label}>Connection Name</Text>
      {editingTheme ? (
        <TextInput
          placeholderTextColor={neutral[600]}
          placeholder={"Eg Room 1"}
          onChangeText={handleOnChangeName}
          style={configForm.input}
          value={editingTheme.name}
        />
      ) : null}

      <View style={app.card}>
        {editingTheme
          ? editingTheme.colors.map((c: Color) => {
              return (
                <View
                  style={[settings.listItemContainer, { marginBottom: 16 }]}
                  key={c.colorId ? c.colorId : `${c.h}${c.s}${c.v}`}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Svg height="30" width="30">
                      <Circle
                        cx="15"
                        cy="15"
                        r="15"
                        fill={hsvToHex(c.h, c.s, c.v)}
                      />
                    </Svg>
                    <Text style={[settings.listItemText, { marginLeft: 8 }]}>
                      {getColorName(hsvToHex(c.h, c.s, c.v)).name}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      handleRemoveColor(c);
                    }}
                  >
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color={background.states.red}
                    />
                  </TouchableOpacity>
                </View>
              );
            })
          : null}

        <Button onButtonPress={handleAddColor}>Add Color</Button>
      </View>
      <Button onButtonPress={handleOnSave} style={{ marginTop: 50 }}>
        SAVE
      </Button>
    </PageLayout>
  );
};

const mapStateToProps = (state: any) => {
  return {
    savedThemes: state.savedThemes,
    editingTheme: state.editingTheme,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateEditingTheme: (t: ColorPalette) =>
      dispatch({ type: "UPDATE_EDITINGTHEME", payload: t }),
    updateSavedThemes: (themes: ColorPalette[]) =>
      dispatch({ type: "UPDATE_SAVEDTHEMES", payload: themes }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTheme);
