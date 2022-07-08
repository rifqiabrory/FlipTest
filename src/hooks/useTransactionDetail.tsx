import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import type { Transaction } from '../types';
import { transactions } from '../features/transaction-list/transactionsSlice';

export const useTransactionDetail = (transactioinID: string) => {
    const [transaction, setTransaction] = useState<Transaction>();
    const { dataSource } = useSelector(transactions);

    useEffect(() => {
        const result = dataSource.find(({ id }: Transaction) => id === transactioinID)
        setTransaction(result);
    }, []);


    return { transaction };
}