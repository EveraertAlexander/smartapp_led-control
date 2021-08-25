import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../../styles/colors/theme";
import { page } from "../../styles/generic";

import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { LedConfig } from "../../models/ledConfig";
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
