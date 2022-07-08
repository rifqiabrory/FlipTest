import React from 'react'
import { Text, View, ViewStyle, TextStyle, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../utilities'

/**
 * Radio Button Props's Interface
 */
export interface RadioButtonProps {
    label: string,
    onChange: Function,
    buttonStyle?: ViewStyle,
    activeButton: string,
    labelStyle?: TextStyle,
    radioSize?: number
}

/**
 * Radio Button Component
 */
const RadioButton: React.FC<RadioButtonProps> = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.onChange(props.label)}
            style={[radioButtonStyles.buttonStyle, props.buttonStyle]}>
            <View style={[radioButtonStyles.radio, props.radioSize ? { width: props.radioSize, height: props.radioSize, borderRadius: props.radioSize } : null]}>
                {props.activeButton === props.label ? (
                    <View style={[radioButtonStyles.fill, props.radioSize ? { width: props.radioSize / 1.6, height: props.radioSize / 1.6, borderRadius: props.radioSize } : null]} />
                ) : null}
            </View>
            <Text style={radioButtonStyles.label}>{props.label}</Text>
        </TouchableOpacity>
    )
}

/**
 * Radio Button Component Styles
 */
const radioButtonStyles = StyleSheet.create({
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    radio: {
        width: 20,
        height: 20,
        borderWidth: 1.3,
        borderRadius: 10,
        borderColor: Colors.warm,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fill: {
        backgroundColor: Colors.warm,
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    label: {
        fontWeight: '500',
        fontSize: 13,
        color: Colors.black,
        lineHeight: 18,
        paddingLeft: 13
    }
})

export default RadioButton