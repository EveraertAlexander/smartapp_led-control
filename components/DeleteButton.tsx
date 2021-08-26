import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { deleteButton } from '../styles/components/button'

const DeleteButton = ({onButtonPress, children}: {onButtonPress?: Function, children: any}) => {
    return (
        <TouchableOpacity onPress={() => {
            if(onButtonPress){
                onButtonPress();
            }
        }} style={deleteButton.body}>
            <Text style={deleteButton.text}>{children}</Text>
        </TouchableOpacity>
    )
}

export default DeleteButton
