import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { settings } from "../../styles/components/settings";
import { Text, TextInput, View } from "react-native";
import { neutral } from "../../styles/colors/theme";
import { configForm } from "../../styles/components/configForm";
import { LedConfig } from "../../models/ledConfig";
import Button from "../../components/Button";
import { connect } from "react-redux";
import { validateIp, validateName } from "../../utils/validation";
import { ledConfig } from "../../utils/db";

const AddConnection = ({
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
  const [connection, setConnection] = useState<LedConfig>({
    name: "",
    ipAddress: "",
  });

  const handleOnChangeName = (text: string) => {
    setConnection({ ...connection, name: text });
  };

  const handleOnChangeIpAddress = (text: string) => {
    setConnection({ ...connection, ipAddress: text });
  };

  const handleSaveButton = async () => {
    console.log("Save Pressed");

    if(validateName(connection.name) && validateIp(connection.ipAddress)){
        const insert = await ledConfig.create(connection)

        if(insert){
            previousConnections.push({...connection, id: insert.insertId})

            // const updatedConnections = 

            
            updatePreviousConnections([...previousConnections]);
            navigation.pop();
        }
    }
  };

  return (
    <PageLayout>
      <Text style={[settings.header, { marginBottom: 16 }]}>
        Add a Connection
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
        placeholder={"Eg 0.0.0.0"}
        onChangeText={handleOnChangeIpAddress}
        style={configForm.input}
        value={connection.ipAddress}
      />
      <Button onButtonPress={handleSaveButton} style={{ marginTop: 16 }}>
        SAVE
      </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddConnection);
