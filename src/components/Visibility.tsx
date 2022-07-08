import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from "react-native";
import styles from '../styles';

/**
 * VisibilityProps's Interface
 */
interface VisibilityProps {
    visible: boolean,
    style?: ViewStyle,
}

/**
 * Visibility Component
 */
export const Visibility: React.FC<PropsWithChildren<VisibilityProps>> = ({ visible, ...rest }) => {
    return (
        <View style={ visible ? rest.style : styles.hide}>
            {rest.children}
        </View>
    )
}