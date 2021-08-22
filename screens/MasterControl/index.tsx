import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

import Overview from './overview';
import ConnectPage from '../ConnectPage';


const Stack = createStackNavigator();


const MasterControl = function({ navigation }: any) {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name = "Connect" component = {ConnectPage}/>
            <Stack.Screen name = "Overview" component = {Overview}/>
        </Stack.Navigator>
    )
}

export default MasterControl;