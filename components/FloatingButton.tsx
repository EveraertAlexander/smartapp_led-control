import React from "react";
import { TouchableOpacity } from "react-native";
import { floatingButton } from "../styles/components/button";
import { AntDesign } from '@expo/vector-icons'; 
import { neutral } from "../styles/colors/theme";

const FloatingButton = ({onButtonPress}: {onButtonPress?: Function}) => {
  return (
    <TouchableOpacity onPress={() => {
        if(onButtonPress){
            onButtonPress();
        }
    }} style={floatingButton.body}>
      <AntDesign name="plus" size={24} color={neutral[200]} />
    </TouchableOpacity>
  );
};

export default FloatingButton;
