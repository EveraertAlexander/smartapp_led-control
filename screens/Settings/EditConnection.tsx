import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import Button from "../../components/Button";
import PageLayout from "../../components/PageLayout";
import { LedConfig } from "../../models/ledConfig";
import { neutral } from "../../styles/colors/theme";
import { configForm } from "../../styles/components/configForm";
import { settings } from "../../styles/components/settings";
import { ledConfig } from "../../utils/db";

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
  };

  const handleDeleteButton = () => {

    let updatedConnections = previousConnections.map((c: LedConfig) => {
      if (c && c.id == connection.id) {
        return;
      } else {
        return c;
      }
    });

    updatePreviousConnections(updatedConnections ? updatedConnections : []);
    if (connection.id) ledConfig.delete(connection.id);
    navigation.pop();
  };

  return (
    <PageLayout>
      <Text style={[settings.header, { marginBottom: 16 }]}>
        Edit Connection
      </Text>
      <Text style={configForm.label}>Connection Name</Text>
      <TextInput
        placeholderTextColor={neutral[600]}
        placeholder={"Eg Room 1"}
        onChangeText={handleOnChangeName}
        style={configForm.input}
        value={connection.name}
      />
      <Text style={configForm.label}>IP Address</Text>
      <TextInput
        placeholderTextColor={neutral[600]}
        placeholder={"Eg Room 1"}
        onChangeText={handleOnChangeIpAddress}
        style={configForm.input}
        value={connection.ipAddress}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 16,
        }}
      >
        <Button
          style={{ width: 100, marginHorizontal: 8 }}
          onButtonPress={handleDeleteButton}
          discrete={true}
        >
          DELETE
        </Button>
        <Button
          style={{ width: 100, marginHorizontal: 8 }}
          onButtonPress={handleSaveButton}
        >
          SAVE
        </Button>
      </View>
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
