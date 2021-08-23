import React from "react";
import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import { button } from "../styles/components/button";

const Button = ({children, discrete, onButtonPress, style}: {children?: any, discrete?: boolean, onButtonPress?: Function, style?: StyleProp<ViewStyle>}) => {



  return (
    <TouchableOpacity onPress={() => {
        if(onButtonPress){
            onButtonPress()
        }
    }} style={[discrete ? button.redButton : button.button, style ? style : {}]}>
      <Text style={discrete ? button.redButtonText : button.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
