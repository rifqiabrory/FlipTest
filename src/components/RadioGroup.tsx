import React from 'react'
import { StyleSheet, View, TouchableOpacity, ViewStyle, Text, TextStyle, ViewProps } from 'react-native'
import { Colors } from '../utilities'

export interface option {
  value: string,
  label: string,
}

export interface RadioGroupProps {
  options: Array<option>,
  activeButton: string,
  onChange: Function,
  containerOptions?: ViewProps,
  buttonStyle?: ViewStyle,
  labelStyle?: TextStyle,
  radioSize?: number,
}

export interface RadioButtonProps {
  label: string,
  onChange: Function,
  buttonStyle?: ViewStyle,
  activeButton: string,
  labelStyle?: TextStyle,
  radioSize?: number
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  return (
    <View
      {...props.containerOptions}>
      {props.options.map((data) => {
        return (
          <RadioButton
            key={data.value}
            label={data.label}
            activeButton={props.activeButton}
            buttonStyle={props.buttonStyle}
            onChange={props.onChange}
            radioSize={props.radioSize}
          />
        )
      })}
    </View>
  )
}

const RadioButton: React.FC<RadioButtonProps> = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.onChange(props.label)}
      style={[styles.buttonStyle, props.buttonStyle]}>
      <View style={[styles.radio, props.radioSize ? { width: props.radioSize, height: props.radioSize, borderRadius: props.radioSize } : null]}>
        {props.activeButton === props.label ? (
          <View style={[styles.fill, props.radioSize ? { width: props.radioSize / 1.6, height: props.radioSize / 1.6, borderRadius: props.radioSize } : null]}></View>
        ) : null}
      </View>
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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

export default RadioGroup