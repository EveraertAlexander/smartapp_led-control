import React, { useEffect } from 'react';
import { app, forms } from '../styles/generic';
import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { background } from '../styles/colors/theme';


export const ConnectionStatus = function ({connected, ipAddress}: {connected: boolean, ipAddress: string}) {

    return (
        <View style={[app.row]}>
            <View>
            <Text style={forms.title}>Connection Status</Text>
            <Text style={{color: '#FFF'}}>{ipAddress}</Text>

            </View>
            <Svg height='20' width='20'>
                <Circle cx="10" cy="10" r="10" fill={connected ? background.states.green : background.states.red} />
            </Svg>
        </View>
    )
}