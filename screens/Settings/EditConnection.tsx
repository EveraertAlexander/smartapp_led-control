import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import PageLayout from "../../components/PageLayout";
import { LedConfig } from "../../models/ledConfig";
import { neutral, theme } from "../../styles/colors/theme";
import { card } from "../../styles/components/card";
import { textInput } from "../../styles/components/textInput";
import { ledConfig } from "../../utils/db";
import DeleteButton from "../../components/DeleteButton";
import { validateIp } from "../../utils/validation";

const EditConnection = ({
  route,
  navigation,
  previousConnections,
  updatePreviousConnections,
}: {
  route: any;
  navigation: any;
  previousConnections: LedConfig[];
  updatePreviousConnections: Function;
}) => {
  const [connection, setConnection] = useState<LedConfig>(route.params);

  const handleOnChangeName = (text: string) => {
    setConnection({ ...connection, name: text });
  };

  const handleOnChangeIpAddress = (text: string) => {
    setConnection({ ...connection, ipAddress: text });
  };

  const handleSaveButton = () => {

    if(validateIp(connection.ipAddress)){
      const updatedConnections: LedConfig[] = previousConnections.map(
        (c: LedConfig) => {
          if (c && c.id == connection.id) {
            return {
              id: c.id,
              name: connection.name,
              ipAddress: connection.ipAddress,
            };
          } else {
            return c;
          }
        }
      );
      updatePreviousConnections(updatedConnections);
      ledConfig.update(connection);
      navigation.pop();
    } else {
      alert("You have entered an invalid IP address!");
    }
    
  };

  const handleDeleteButton = () => {
    Alert.alert(
      "Warning!",
      `Are you sure you want to delete this connection?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "YES",
          onPress: async () => {
            let updatedConnections = previousConnections.map((c: LedConfig) => {
              if (c && c.id == connection.id) {
                return;
              } else {
                return c;
              }
            });

            updatePreviousConnections(
              updatedConnections ? updatedConnections : []
            );
            if (connection.id) ledConfig.delete(connection.id);
            navigation.pop();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <PageLayout>
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
          Edit Connection
        </Text>
        <TouchableOpacity onPress={handleSaveButton}>
          <Text
            style={{
              fontFamily: "Raleway-Bold",
              fontSize: 16,
              color: theme.alpha,
            }}
          >
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
      <View style={card.body}>
        <Text style={card.title}>Details</Text>
        <Text style={textInput.label}>Name</Text>
        <TextInput
          placeholderTextColor={neutral[400]}
          placeholder={"Eg Room 1"}
          onChangeText={handleOnChangeName}
          style={textInput.input}
          value={connection.name}
          selectionColor={neutral[300]}
        />
        <Text style={textInput.label}>IP Address</Text>
        <TextInput
          placeholderTextColor={neutral[400]}
          placeholder={"Eg 0.0.0.0"}
          onChangeText={handleOnChangeIpAddress}
          style={textInput.input}
          value={connection.ipAddress}
          selectionColor={neutral[300]}
        />
      </View>
      <DeleteButton onButtonPress={handleDeleteButton}>
        DELETE CONNECTION
      </DeleteButton>
    </PageLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditConnection);
