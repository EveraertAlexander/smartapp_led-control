import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { neutral, theme } from "../../styles/colors/theme";
import { LedConfig } from "../../models/ledConfig";
import { connect } from "react-redux";
import { validateIp, validateName } from "../../utils/validation";
import { ledConfig } from "../../utils/db";
import { card } from "../../styles/components/card";
import { textInput } from "../../styles/components/textInput";

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
          Add Connection
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
