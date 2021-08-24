import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LedConfig } from "../models/ledConfig";
import { background } from "../styles/colors/theme";
import { configForm } from "../styles/components/configForm";
import { header } from "../styles/components/header";
import { ledConfig } from "../utils/db";
import RNPickerSelect, { PickerStyle } from "react-native-picker-select";
import { pickerSelectStyles } from "../styles/components/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { validateIp, validateName } from "../utils/validation";

const ConnectPage = ({
  navigation,
  previousConnections,
  updateIpAddress,
  updatePreviousConnections,
}: {
  navigation: any;
  previousConnections: LedConfig[];
  updateIpAddress: Function;
  updatePreviousConnections: Function;
}) => {

  const [pickerItems, setPickerItems] = useState<any>([]);
  const [selected, setSelected] = useState<any>();
  const [currentConfig, setCurrentConfig] = useState<LedConfig>({
    name: "",
    ipAddress: "",
  });

  const placeholder = {
    label: `Select Device`,
    value: null,
    color: "#9EA0A4",
  };

  const handleConnectPress = async () => {
    if (
      validateIp(currentConfig.ipAddress) &&
      validateName(currentConfig.name)
    ) {

      updateIpAddress(currentConfig.ipAddress);
      navigation.navigate("Main");
    } else if (!validateIp(currentConfig.ipAddress)) {
      alert("You have entered an invalid IP address!");
    }
  };

  const handlePickerChange = (e: any) => {
    // console.log(e);

    setSelected(e);

    if (e != null) {
      previousConnections.map((c) => {
        if (c && c.id == e) {
          setCurrentConfig({ id: c.id, name: c.name, ipAddress: c.ipAddress });
        }
      });
    } else {
      setCurrentConfig({ id: undefined, name: "", ipAddress: "" });
    }
  };

  useEffect(() => {
    if (previousConnections) {
      const _items = previousConnections
        .filter((c: any) => {
          if (c) {
            return true;
          }
          return false;
        })
        .map((c) => {
          return { label: c.name, value: c.id };
        });

      if (_items) {
        setPickerItems(_items);
      } else {
        setPickerItems([]);
      }
    }

    setCurrentConfig({ id: undefined, name: "", ipAddress: "" });
    setSelected(null)
  }, [previousConnections]);

  return (
    <SafeAreaView
      style={[background.neutral[1000], configForm.container, { flex: 1 }]}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={configForm.header}>Led Control Center</Text>
        {/* <View style={{width:'100%'}}>
          <View style={configForm.savedSection}>
            <Text style={configForm.savedSectionText}>Huiskamer</Text>
            <Text style={configForm.savedSectionText}>192.168.0.99</Text>
          </View>
        </View> */}
        <View style={{ width: "50%" }}>
          <RNPickerSelect
            placeholder={placeholder}
            items={pickerItems}
            onValueChange={handlePickerChange}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                right: 5,
                top: 4,
              },
            }}
            value={selected}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return (
                <MaterialIcons name="arrow-drop-down" size={24} color="white" />
              );
            }}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text style={configForm.label}>Name</Text>
          <TextInput
            style={configForm.input}
            onChangeText={(val: string) => {
              setCurrentConfig((currentConfig) => ({
                ...currentConfig,
                name: val,
              }));
            }}
            placeholder={"eg. 0.0.0.0"}
            value={currentConfig.name}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text style={configForm.label}>IP Address</Text>
          <TextInput
            style={configForm.input}
            onChangeText={(val: string) => {
              setCurrentConfig((currentConfig) => ({
                ...currentConfig,
                ipAddress: val,
              }));
            }}
            placeholder={"eg. 0.0.0.0"}
            value={currentConfig.ipAddress}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          onPress={handleConnectPress}
          style={configForm.button}
        >
          <Text style={configForm.buttonText}>Connect</Text>
        </TouchableOpacity>
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateIpAddress: (addr: string) =>
      dispatch({ type: "UPDATE_IPADDRESS", payload: addr }),
    updatePreviousConnections: (config: LedConfig[]) =>
      dispatch({ type: "UPDATE_PREVIOUSCONNECTIONS", payload: config }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectPage);
