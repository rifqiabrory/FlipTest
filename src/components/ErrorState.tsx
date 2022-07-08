import React, { PropsWithChildren } from 'react';
import { Text, View, ViewStyle } from 'react-native';
import styles from '../styles';

/**
 * Error State Props's Interface
 */
interface ErrorStateProps {
    message: string,
    style?: ViewStyle,
}

/**
 * Error State Component
 */
const ErrorState: React.FC<PropsWithChildren<ErrorStateProps>> = ({ message, style, children }) => (
    <View style={[styles.errorContainer, style]}>
        <Text style={styles.errorText}>{message}</Text>
        {children}
    </View>
)

export default ErrorState;