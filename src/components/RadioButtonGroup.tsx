import React from 'react'
import { View, ViewStyle, TextStyle } from 'react-native'
import RadioButton from './RadioButton'

/**
 * Option Interface
 */
export interface option {
  value: string,
  label: string,
}

/**
 * Radio Button Group Props's Interface
 */
export interface RadioButtonGroupProps {
  options: Array<option>,
  activeButton: string,
  onChange: Function,
  containerStyle?: ViewStyle,
  buttonStyle?: ViewStyle,
  labelStyle?: TextStyle,
  radioSize?: number,
}

/**
 * Radio Button Group Component
 */
const RadioButtonGroup: React.FC<RadioButtonGroupProps> = (props) => {
  return (
    <View style={props.containerStyle}>
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

export default RadioButtonGroup