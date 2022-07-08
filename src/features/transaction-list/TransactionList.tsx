import React, { useEffect } from "react";
import { Text, Pressable, FlatList, ActivityIndicator, ListRenderItemInfo } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { retriveTransactions, transactions } from "./transactionsSlice";
import type { StackParams, Transaction } from "../../types";
import { SearchBar, ErrorState } from "../../components";
import { Strings } from "../../utilities";
import { AppDispatch } from "../../app/store";
import { ListItem } from "./ListItem";
import styles from '../../styles';

/**
 * Transaction List Props
 */
type Props = NativeStackScreenProps<StackParams, 'Transaction'>

/**
 * Transaction List Screen
 */
const TransactionList = ({ route, navigation }: Props) => {
    /**
     * Hook's
     */
    const { dataSource, loading, error } = useSelector(transactions);
    const dispatch = useDispatch<AppDispatch>();

    /**
     * useEffect Hook
     * @description Fetching data
     */
    useEffect(() => {
        dispatch(retriveTransactions())
    }, [route]);

    /**
     * Render Items Method
     * @param item - Transaction
     */
    const _renderItems = ({ item }: ListRenderItemInfo<Transaction>) => {
        return <ListItem {...{ item }} onPressItem={() => navigation.navigate('TransactionDetail', { transactionID: item.id })} />
    }

    /**
     * Loading Validation UI
     */
    if (loading) {
        return <ActivityIndicator size="small" style={styles.loading} />
    }

    /**
     * Error Validation UI
     */
    if (error) {
        return (
            <ErrorState message={error} style={{ justifyContent: 'space-around' }}>
                <Pressable style={styles.retryButtton} onPress={() => {
                    dispatch(retriveTransactions())
                }}>
                    <Text style={styles.retryLabel}>{Strings.RETRY}</Text>
                </Pressable>
            </ErrorState>
        )
    }

    return (
        <FlatList
            data={dataSource}
            bounces={false}
            style={styles.container}
            scrollEventThrottle={16}
            stickyHeaderIndices={[0]}
            renderItem={_renderItems}
            stickyHeaderHiddenOnScroll
            keyExtractor={item => item.id}
            scrollIndicatorInsets={{ top: 42 }}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            ListHeaderComponentStyle={{ marginHorizontal: -8 }}
            ListHeaderComponent={SearchBar}
            ListEmptyComponent={<ErrorState message={Strings.NO_DATA_AVAILABLE} />}
        />
    )
}

export default TransactionList;