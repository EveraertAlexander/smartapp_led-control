import React from 'react';
import { View, Text } from 'react-native';
import { header } from '../styles/components/header';
import { app } from '../styles/generic';


export const Header = function(){
    return (
        <View style= {app.header}>
                <Text style={header.logo}>Led Control Center</Text>
            </View>
    )
}