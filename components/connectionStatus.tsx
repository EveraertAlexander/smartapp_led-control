import React from 'react';
import { app, forms } from '../styles/generic';
import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { background } from '../styles/colors/theme';


export const ConnectionStatus = function () {
    return (
        <View style={[app.row]}>
            <Text style={forms.title}>Connection Status</Text>
            <Svg height='20' width='20'>
                <Circle cx="10" cy="10" r="10" fill={background.states.green} />
            </Svg>
        </View>
    )
}