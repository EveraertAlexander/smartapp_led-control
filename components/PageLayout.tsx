import React from "react";
import { SafeAreaView, View } from "react-native";
import { background } from "../styles/colors/theme";
import { app } from "../styles/generic";

const PageLayout = (props: any) => {
  return (
    <SafeAreaView style={[background.neutral[1000], { flex: 1 }]}>
      <View style={app.container}>{props.children}</View>
    </SafeAreaView>
  );
};

export default PageLayout;
