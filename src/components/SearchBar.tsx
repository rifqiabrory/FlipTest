import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, View, Image, TextInput, Pressable, StyleSheet } from 'react-native';
import { onChange, onFetching, transactions } from '../features/transaction-list/transactionsSlice';
import { Colors, SEARCH_ICON, ARROW_DOWN_ICON } from '../utilities';
import { StackParams } from '../types';
import { AppDispatch } from '../app/store';
import styles from '../styles';

const SearchBar: React.FC = () => {
    const { filter, keyword } = useSelector(transactions);
    const dispatch = useDispatch<AppDispatch>()

    const navigation = useNavigation<NavigationProp<StackParams>>();

    const _onChangeText = useCallback((keyword: string) => {
        dispatch(onChange({
            key: 'keyword',
            value: keyword
        }));
    }, [keyword])

    const onFilterSeleted = useCallback((filter: string) => {
        dispatch(onChange({
            key: 'filter',
            value: filter
        }));
        dispatch(onFetching());
    }, [filter]);

    const _onOpenFilter = useCallback(() => {
        navigation.navigate('SortModal', { filter, onFilterSeleted })
    }, [filter]);

    const _onSearching = useCallback(() => {
        dispatch(onFetching());
    }, [keyword]);
    
    return (
        <View style={searchBarStyles.container}>
            <View style={searchBarStyles.wrapper}>
                <Image source={SEARCH_ICON} style={[styles.icon, { marginHorizontal: 5 }]} />
                <TextInput 
                    value={keyword} 
                    placeholder="Cari nama, bank, atau nominal" 
                    onChangeText={_onChangeText} 
                    placeholderTextColor={Colors.grey}
                    returnKeyType="search"
                    returnKeyLabel="Cari"
                    onSubmitEditing={_onSearching}
                />
            </View>
            <Pressable style={searchBarStyles.wrapper} onPress={_onOpenFilter}>
                <Text style={searchBarStyles.label}>{filter}</Text>
                <Image source={ARROW_DOWN_ICON} style={[styles.icon, { tintColor: Colors.warm }]} />
            </Pressable>
        </View>
    )
}

const searchBarStyles = StyleSheet.create({
    container: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.white, paddingVertical: 14, paddingHorizontal: 5, borderRadius: 8 },
    label: { fontWeight: '600', fontSize: 13, paddingRight: 5, color: Colors.warm },
    wrapper: { flexDirection: 'row', justifyContent: 'center', alignItems: "center" },
})

export default SearchBar;