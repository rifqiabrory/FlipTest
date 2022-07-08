import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { onChange, transactions } from '../features/transaction-list/transactionsSlice';
import { Colors, FilterOptions } from '../utilities';
import { AppDispatch } from '../app/store';
import { StackParams } from '../types';
import RadioGroup from './RadioGroup';
const { width } = Dimensions.get('screen');

type Props = NativeStackScreenProps<StackParams, 'SortModal'>

const SortModal: React.FC<Props> = ({ navigation }) => {
    const { filter } = useSelector(transactions);
    const dispatch = useDispatch<AppDispatch>()
    
    const _onChange = useCallback((value: string) => {
        navigation.goBack();
        dispatch(onChange({ key: 'filter', value}));
    }, [filter]);

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