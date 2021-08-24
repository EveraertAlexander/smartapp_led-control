import React, { useEffect } from "react";
import {
  SafeAreaView,
  Settings,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { background, neutral, theme } from "../../styles/colors/theme";
import { settings } from "../../styles/components/settings";
import { app, page } from "../../styles/generic";

import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { LedConfig } from "../../models/ledConfig";
import Button from "../../components/Button";
import PageLayout from "../../components/PageLayout";
import { card } from "../../styles/components/card";
import FloatingButton from "../../components/FloatingButton";

const SettingsHome = ({
  navigation,
  previousConnections,
}: {
  navigation: any;
  previousConnections?: LedConfig[];
}) => {
  const handleOnPress = (ledConfig: LedConfig) => {
    navigation.navigate("Edit Connection", ledConfig);
  };

  const handleAddConnection = () => {
    navigation.navigate("Add Connection");
  };

  return (
    <View style={{ flex: 1 }}>
      <PageLayout>
        {/* <View style={app.container}>
        <Text style={[settings.header, { marginBottom: 16 }]}>Connections</Text>
        <View style={app.card}>
          {previousConnections
            ? previousConnections.map((c) => {
                if (c) {
                  return (
                    <TouchableOpacity
                      style={settings.listItemContainer}
                      key={c.name}
                      onPress={() => {
                        handleOnPress(c);
                      }}
                    >
                      <View>
                        <Text style={settings.listItemText}>{c.name}</Text>
                        <Text style={settings.listItemSubText}>
                          {c.ipAddress}
                        </Text>
                      </View>
                      <MaterialIcons
                        name="keyboard-arrow-right"
                        size={24}
                        color={theme.dark}
                      />
                    </TouchableOpacity>
                  );
                }
              })
            : null}
          <Button onButtonPress={handleAddConnection} style={{ marginTop: 16 }}>
            Add Connection
          </Button>
        </View>
      </View> */}
        <Text style={page.title}>My Connections</Text>
        {previousConnections
          ? previousConnections.map((c) => {
              if (c) {
                return (
                  <TouchableOpacity
                    style={[
                      card.body,
                      {
                        marginBottom: 16,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                      },
                    ]}
                    key={c.name}
                    onPress={() => {
                      handleOnPress(c);
                    }}
                  >
                    <View>
                      <Text style={card.smallTitle}>{c.name}</Text>
                      <Text style={card.subTitle}>{c.ipAddress}</Text>
                    </View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color={theme.dark}
                    />
                  </TouchableOpacity>
                );
              }
            })
          : null}
      </PageLayout>
      <FloatingButton onButtonPress={handleAddConnection}/>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    ipAddress: state.ipAddress,
    previousConnections: state.previousConnections,
  };
};

export default connect(mapStateToProps)(SettingsHome);
