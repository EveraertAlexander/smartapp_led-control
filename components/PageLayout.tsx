import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { background } from "../styles/colors/theme";
import { app } from "../styles/generic";

const PageLayout = (props: any) => {
  return (
    <SafeAreaView style={[background.neutral[1000], { flex: 1 }]}>
      <ScrollView refreshControl={props.refreshControl ? props.refreshControl : null} style={app.container}>{props.children}</ScrollView>
    </SafeAreaView>
  );
};

export default PageLayout;
