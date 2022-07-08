import React, { PropsWithChildren } from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../utilities';

interface Error {
    message: string,
    style?: ViewStyle,
}

const ErrorModal: React.FC<PropsWithChildren<Error>> = ({ message, style, children }) => (
    <View style={[styles.container, style]}>
        <Text style={styles.text}>{message}</Text>
        {children}
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary
    },
    text: {
        paddingTop: 25,
        fontSize: 14,
        fontWeight: '400',
        color: Colors.grey
    }
})

export default ErrorModal;