import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, View, Image, TextInput, Pressable, StyleSheet } from 'react-native';
import { onChange, transactions } from '../features/transaction-list/transactionsSlice';
import { Colors, SEARCH_ICON, ARROW_DOWN_ICON, Strings } from '../utilities';
import type { StackParams } from '../types';
import { AppDispatch } from '../app/store';
import styles from '../styles';

/**
 * Search Bar Component
 */
const SearchBar: React.FC = () => {
    /**
     * Hook's
     */
    const dispatch = useDispatch<AppDispatch>()
    const { filter, keyword } = useSelector(transactions);
    const navigation = useNavigation<NavigationProp<StackParams>>();

    /**
     * onChangeText Method
     * @description Update searching keywoard value
     * @param keyword - string
     */
    const _onChangeText = useCallback((keyword: string) => {
        dispatch(onChange({ key: 'keyword', value: keyword }));
    }, [keyword])

    /**
     * onOpenFilter Method
     * @description Open filter modal
     */
    const _onOpenFilter = useCallback(() => {
        navigation.navigate('FilterModal')
    }, []);

    return (
        <View style={searchBarStyles.container}>
            <View style={searchBarStyles.wrapper}>
                <Image source={SEARCH_ICON} style={[styles.icon, { marginHorizontal: 5 }]} />
                <TextInput
                    value={keyword}
                    placeholder={Strings.TRANSACTION_SEARCH_PLACEHOLDER}
                    onChangeText={_onChangeText}
                    placeholderTextColor={Colors.grey}
                    returnKeyType="search"
                    returnKeyLabel="Cari"
                />
            </View>
            <Pressable style={searchBarStyles.wrapper} onPress={_onOpenFilter}>
                <Text style={searchBarStyles.label}>{filter}</Text>
                <Image source={ARROW_DOWN_ICON} style={[styles.icon, { tintColor: Colors.warm }]} />
            </Pressable>
        </View>
    )
}

/**
 * Search Bar Component Styles
 */
const searchBarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    label: {
        fontWeight: '600',
        fontSize: 13,
        paddingRight: 5,
        color: Colors.warm
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center"
    },
})

export default SearchBar;