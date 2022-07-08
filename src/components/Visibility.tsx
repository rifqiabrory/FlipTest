import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from "react-native";
import styles from '../styles';

/**
 * Visibility Props's Interface
 */
interface VisibilityProps {
    visible: boolean,
    style?: ViewStyle,
}

/**
 * Visibility Component
 */
const Visibility: React.FC<PropsWithChildren<VisibilityProps>> = ({ visible, ...rest }) => {
    return (
        <View style={visible ? rest.style : styles.hide}>
            {rest.children}
        </View>
    )
}

export default Visibility