import React, { useState } from "react";
import { connect } from "react-redux";
import PageLayout from "../../components/PageLayout";
import { Color, ColorPalette } from "../../models/palette";
import { settings } from "../../styles/components/settings";
import { Text, View } from "react-native";
import { TriangleColorPicker } from "react-native-color-picker";
import Button from "../../components/Button";

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
    setSelectedColor({...selectedColor, h: c.h, s: c.s, v: c.v});

  };

  const handleAddColor = () => {
    editingTheme.colors.push(normalizeColor(selectedColor));

    updateEditingTheme({ ...editingTheme });
    navigation.pop();
  };

  return (
    <PageLayout>
      <Text style={[settings.header, { marginBottom: 16 }]}>Add Color</Text>
      <View style={{ height: 200 }}>
        <TriangleColorPicker
          onColorChange={handleChangeColor}
          hideControls={true}
          style={{ flex: 1 }}
        />
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
