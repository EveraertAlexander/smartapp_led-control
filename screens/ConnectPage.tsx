import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, TextInput, Image } from "react-native";
import { LedConfig } from "../models/ledConfig";
import { background, neutral } from "../styles/colors/theme";
import RNPickerSelect, { PickerStyle } from "react-native-picker-select";
import { pickerSelectStyles } from "../styles/components/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { validateIp, validateName } from "../utils/validation";
import { card } from "../styles/components/card";
import { connectPage } from "../styles/components/connectPage";
import { textInput } from "../styles/components/textInput";
import Button from "../components/Button";
import { Header } from "../components/Header";

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
    if (validateIp(currentConfig.ipAddress)) {
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
    setSelected(null);
  }, [previousConnections]);

  return (
    <SafeAreaView style={[background.neutral[1000], { flex: 1 }]}>
      <View style={connectPage.container}>
        <Header/>
        <View style={card.body}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: neutral[100],
                fontFamily: "Raleway-Medium",
              }}
            >
              Connect
            </Text>
            <View style={{ width: "50%", marginTop: 4 }}>
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
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="white"
                    />
                  );
                }}
              />
            </View>
          </View>
          <Text style={textInput.label}>IP Address</Text>
          <TextInput
            style={textInput.input}
            onChangeText={(val: string) => {
              setCurrentConfig((currentConfig) => ({
                ...currentConfig,
                ipAddress: val,
              }));
            }}
            placeholder={"eg. 0.0.0.0"}
            placeholderTextColor={neutral[400]}
            value={currentConfig.ipAddress}
            keyboardType="phone-pad"
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button onButtonPress={handleConnectPress}>CONNECT</Button>
          </View>
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateIpAddress: (addr: string) =>
      dispatch({ type: "UPDATE_IPADDRESS", payload: addr }),
    updatePreviousConnections: (config: LedConfig[]) =>
      dispatch({ type: "UPDATE_PREVIOUSCONNECTIONS", payload: config }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectPage);
