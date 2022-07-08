import React from 'react';
import { View, ViewStyle } from "react-native";
import styles from '../styles';

/**
 * Divider Props's Interface
 */
interface DividerProps {
    style?: ViewStyle
}

/**
 * Divider Component
 */
const Divider: React.FC<DividerProps> = ({ style }) => <View style={[styles.divider, style]} />
export default Divider;