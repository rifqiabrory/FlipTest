import React, { useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import RadioGroup from './RadioGroup';
import { StackParams } from '../types';
import { Colors, FilterOptions } from '../utilities';
type Props = NativeStackScreenProps<StackParams, 'SortModal'>
const { width } = Dimensions.get('screen');

const SortModal: React.FC<Props> = ({ route, navigation }) => {
    const { filter, onFilterSeleted } = route.params;
    
    const _onChange = useCallback((value: string) => {
        navigation.goBack();
        onFilterSeleted(value);
    }, []);

    return (
        <View style={styles.container}>
            <Pressable style={styles.overlay} onPress={navigation.goBack} />
            <View style={styles.box}>
                <RadioGroup activeButton={filter} options={FilterOptions} onChange={_onChange} buttonStyle={styles.buttonItem} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: Colors.overlay
    },
    box: {
        width: width / 1.12,
        borderRadius: 8,
        backgroundColor: Colors.white,
        padding: 20,
    },
    buttonItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 14,
    }
})

export default SortModal;