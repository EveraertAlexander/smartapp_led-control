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
import { app } from "../../styles/generic";

import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { LedConfig } from "../../models/ledConfig";
import Button from "../../components/Button";

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
  }
  
  useEffect(() => {
    console.log("Useeffect gecalled", previousConnections);
    
  }, [previousConnections])

  return (
    <SafeAreaView style={[background.neutral[1000], { flex: 1 }]}>
      <View style={app.container}>
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
            <Button onButtonPress={handleAddConnection} style={{marginTop: 16}}>Add Connection</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: any) => {
  return {
    ipAddress: state.ipAddress,
    previousConnections: state.previousConnections,
  };
};

export default connect(mapStateToProps)(SettingsHome);
