import React from 'react'
import { View, ViewStyle, TextStyle } from 'react-native'
import RadioButton from './RadioButton'

/**
 * Option Interface
 */
export interface Option {
  value: string,
  label: string,
}

/**
 * Radio Button Group Props's Interface
 */
export interface RadioButtonGroupProps {
  value: string,
  options: Array<Option>,
  onChange: Function,
  containerStyle?: ViewStyle,
  buttonStyle?: ViewStyle,
  labelStyle?: TextStyle,
  radioSize?: number,
}

/**
 * Radio Button Group Component
 */
const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ containerStyle, options, ...rest }) => {
  return (
    <View style={containerStyle}>
      {options.map((option: Option) => {
        return (
          <RadioButton
            {...rest}
            key={option.value}
            option={option}
          />
        )
      })}
    </View>
  )
}

export default RadioButtonGroup