import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PageLayout from "../../components/PageLayout";
import { Color, ColorPalette } from "../../models/palette";
import { background, neutral, theme } from "../../styles/colors/theme";
import { palettes } from "../../utils/db";
import Svg, { Circle } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";

import { getColorName } from "../../utils/nearestColor";
import { hsvToHex } from "../../utils/colorConversion";
import { connect } from "react-redux";
import { card } from "../../styles/components/card";
import { textInput } from "../../styles/components/textInput";
import { colorItem } from "../../styles/components/colorItem";
import DeleteButton from "../../components/DeleteButton";

const EditTheme = ({
  navigation,
  route,
  editingTheme,
  updateEditingTheme,
  updateSavedThemes,
}: {
  navigation: any;
  route: any;
  editingTheme: ColorPalette;
  updateEditingTheme: any;
  updateSavedThemes: any;
}) => {

  const handleOnChangeName = (text: string) => {
    updateEditingTheme({ ...editingTheme, name: text });
  };

  const handleAddColor = () => {
    navigation.navigate("Add Color");
  };

  const handleOnSave = async () => {
    if (route.params.newTheme) {
      await palettes.create.palette({ ...editingTheme });
    } else {
      await palettes.update({ ...editingTheme });
    }

    console.log("Palet dat wordt opgeslaan", editingTheme)

    const res = await palettes.read.allPalettes();
    console.log("Palet dat wordt teruggegeven", res)

    updateSavedThemes([...res]);

    navigation.pop();
  };

  const handleOnDelete = async () => {
    Alert.alert(
      "Warning!",
      `Are you sure you want to delete this theme?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "YES",
          onPress: async () => {
            if (!route.params.newTheme) {
              await palettes.delete(editingTheme.id);
            }

            const res = await palettes.read.allPalettes();

            updateSavedThemes([...res]);
            navigation.pop();
          },
        },
      ],
      { cancelable: false }
    );
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

  const createNewTheme = () => {
    const newPalette: ColorPalette = {
      id: Date.now(),
      name: "",
      colors: [],
    };

    updateEditingTheme(newPalette);
  };

  useEffect(() => {
    if (route.params.newTheme) {
      createNewTheme();
    }
  }, []);

  return (
    <PageLayout>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: neutral[100],
            fontFamily: "Raleway-Medium",
          }}
        >
          Edit Theme
        </Text>
        <TouchableOpacity onPress={handleOnSave}>
          <Text
            style={{
              fontFamily: "Raleway-Bold",
              fontSize: 16,
              color: theme.alpha,
            }}
          >
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
      <View style={card.body}>
        <Text style={card.title}>Title</Text>

        {editingTheme ? (
          <TextInput
            placeholderTextColor={neutral[400]}
            placeholder={"Eg Spectrum"}
            onChangeText={handleOnChangeName}
            style={textInput.input}
            value={editingTheme.name}
            selectionColor={neutral[300]}
          />
        ) : null}
      </View>
      <View style={card.body}>
        <Text style={card.title}>Colors</Text>
        <View
          style={{
            borderBottomColor: neutral[300],
            borderBottomWidth: 1,
            marginBottom: 16,
          }}
        >
          <ScrollView
            style={{
              maxHeight: 200,
            }}
          >
            {editingTheme && editingTheme.colors.length != 0
              ? editingTheme.colors.map((c: Color) => {
                  return (
                    <View
                      style={colorItem.container}
                      key={c.colorId ? c.colorId : `${c.h}${c.s}${c.v}`}
                    >
                      <View style={colorItem.colorInfo}>
                        <Svg height="20" width="20">
                          <Circle
                            cx="10"
                            cy="10"
                            r="10"
                            fill={hsvToHex(c.h, c.s, c.v)}
                          />
                        </Svg>
                        <Text style={colorItem.colorText}>
                          {getColorName(hsvToHex(c.h, c.s, c.v)).name}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          handleRemoveColor(c);
                        }}
                      >
                        <MaterialIcons
                          name="delete-outline"
                          size={24}
                          color={background.states.red}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })
              : <Text style={[card.subTitle, {textAlign: 'center', marginBottom: 8}]}>Add a color by pressing the "+" button!</Text>}
          </ScrollView>
        </View>
        <View style={{flexDirection: "row", justifyContent: "center"}}>
          <TouchableOpacity onPress={handleAddColor}>
            <MaterialIcons
              name="add-circle-outline"
              size={32}
              color={theme.alpha}
            />
          </TouchableOpacity>
        </View>
      </View>
        <DeleteButton onButtonPress={handleOnDelete}>DELETE THEME</DeleteButton>

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
