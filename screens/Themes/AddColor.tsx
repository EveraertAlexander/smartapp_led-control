import React, { useState } from "react";
import { connect } from "react-redux";
import PageLayout from "../../components/PageLayout";
import { Color, ColorPalette } from "../../models/palette";
import { Text, View } from "react-native";
import { TriangleColorPicker } from "react-native-color-picker";
import Button from "../../components/Button";
import { page } from "../../styles/generic";
import { card } from "../../styles/components/card";
import Svg, { Circle } from "react-native-svg";
import { hsvToHex } from "../../utils/colorConversion";
import { AddColorItem, colorItem } from "../../styles/components/colorItem";
import { getColorName } from "../../utils/nearestColor";

const AddColor = ({
  navigation,
  editingTheme,
  updateEditingTheme,
}: {
  navigation: any;
  editingTheme: ColorPalette;
  updateEditingTheme: any;
}) => {
  const normalizeColor = (col: Color) => {
    return { ...col, h: col.h / 360 };
  };

  const [selectedColor, setSelectedColor] = useState<Color>({
    colorId: Date.now(),
    h: 360,
    s: 1,
    v: 1,
  });

  const handleChangeColor = (c: Color) => {
    
    setSelectedColor({ ...selectedColor, h: c.h, s: c.s, v: c.v });
  };

  const handleAddColor = () => {
    editingTheme.colors.push(normalizeColor(selectedColor));

    updateEditingTheme({ ...editingTheme });
    navigation.pop();
  };

  return (
    <PageLayout>
      <Text style={page.title}>Add Color</Text>
      <View style={card.body}>
        <Text style={card.title}>Select a color</Text>
        <View style={{ height: 250 }}>
          <TriangleColorPicker
            onColorChange={handleChangeColor}
            hideControls={true}
            style={{ flex: 1, marginBottom: 16 }}
          />
        </View>
        <View style={AddColorItem.container}>
          
          <Svg height="40" width="40">
            <Circle
              cx="20"
              cy="20"
              r="20"
              fill={hsvToHex(selectedColor.h/360, selectedColor.s, selectedColor.v)}
            />
          </Svg>

          <Text style={AddColorItem.text}>
            {
              getColorName(
                hsvToHex(selectedColor.h/360, selectedColor.s, selectedColor.v)
              ).name
            }
          </Text>
        </View>
      </View>
      <Button onButtonPress={handleAddColor}>Add This Color</Button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddColor);
