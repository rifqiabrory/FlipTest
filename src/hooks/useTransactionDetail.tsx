import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import type { Transaction } from '../types';
import { transactions } from '../features/transaction-list/transactionsSlice';

/**
 * useTransactionDetail Hook's
 * @param transactioinID - boolean
 */
export const useTransactionDetail = (transactioinID: string) => {
    /**
     * Hook's
     */
    const [transaction, setTransaction] = useState<Transaction>();
    const { dataSource } = useSelector(transactions);

    /**
     * useEffect Hook
     * @description Find transaction by transaction id
     */
    useEffect(() => {
        const result = dataSource.find(({ id }: Transaction) => id === transactioinID)
        setTransaction(result);
    }, []);

    return { transaction };
}