import React from "react";
import { View, Text, Image } from "react-native";
import { connectPage } from "../styles/components/connectPage";
import { header } from "../styles/components/header";
import { app } from "../styles/generic";

export const Header = function () {
  return (
    <View style={header.container}>
      <Image
        style={header.logo}
        source={require("../assets/PNG/logo.png")}
      />
      <Text style={header.text}>Led Control Center</Text>
    </View>
  );
};

export const SmallHeader = function () {
    return (
      <View style={header.smallContainer}>
        <Image
          style={header.smallLogo}
          source={require("../assets/PNG/logo.png")}
        />
        <Text style={header.text}>Led Control Center</Text>
      </View>
    );
  };


