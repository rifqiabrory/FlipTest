import React, { useEffect } from "react";
import { Text, Pressable, FlatList, ActivityIndicator, ListRenderItemInfo } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { retriveTransactions, transactions } from "./transactionsSlice";
import { SearchBar, ListItem, Error } from "../../components";
import { StackParams, Transaction } from "../../types";
import { AppDispatch } from "../../app/store";
import styles from '../../styles';

type Props = NativeStackScreenProps<StackParams, 'Transaction'>

const TransactionList = ({ route, navigation }: Props) => {
    const { dataSource, loading, error } = useSelector(transactions);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(retriveTransactions())
    }, [route])

    const _renderItems = ({ item }: ListRenderItemInfo<Transaction>) => {
        return <ListItem {...{item}} onPressItem={() => navigation.navigate('TransactionDetail', { transaction: item })} />
    }

    if(loading) {
        return <ActivityIndicator size="large" style={styles.loading} />
    }
    
    if(error){
        return (
            <Error message={error} style={{ justifyContent: 'space-around'}}>
                <Pressable style={styles.retryButtton} onPress={() => {
                    dispatch(retriveTransactions())
                }}>
                    <Text style={styles.retryLabel}>Retry</Text>
                </Pressable>
            </Error>
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
            keyExtractor={item => item.id}
            stickyHeaderHiddenOnScroll={true}
            scrollIndicatorInsets={{ top: 50 }}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            ListHeaderComponentStyle={{ marginHorizontal: -8 }}
            ListHeaderComponent={SearchBar}
            ListEmptyComponent={<Error message="No data available." />}
        />
    )
}

export default TransactionList;