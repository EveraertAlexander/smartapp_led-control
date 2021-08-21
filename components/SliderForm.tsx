import React from 'react';
import { View, Text } from 'react-native';
import { app, forms } from '../styles/generic';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { theme } from '../styles/colors/theme';
import { handleData } from '../utils/dataAccess';
import { Param } from '../models/param';


export const SliderForm = function ({type, style, iconName}: {type: Param, style?: any, iconName: any}) {

    const showResult = (e: any) => {
        console.log(e);
        
    }
    

    const handleValueChange = (e: number) => {

        let val: number = e;

        if(type.key == "master_color_temp") val = Math.round(e) 
        
        handleData(`http://192.168.0.99/setparam?key=${type.key}&value=${val}`, showResult)
        
    }
    

    return (

        <View style={style}>
            <View style={[app.row]}>
                <Text style={forms.title}>{type.title}</Text>
                <MaterialIcons name={iconName} size={32} color="white" />
            </View>
            <Slider
                onValueChange={handleValueChange}
                style={{ height: 40 }}
                minimumValue={type.minValue ? type.minValue : 0}
                maximumValue={type.maxValue ? type.maxValue : 1}
                minimumTrackTintColor={theme.neutral}
                maximumTrackTintColor={theme.dark}
                thumbTintColor={theme.neutral}
            />
        </View>

    )
}