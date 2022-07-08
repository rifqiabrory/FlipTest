import { AxiosError, AxiosResponse } from 'axios';
import type { Transaction } from '../../types';
import HttpClient from '../config/HttpClient';

/**
 * Transaction Services Class
 */
class TransactionServices {
    /**
     * Get All Transactions Method
     */
    static getAllTransactions = () => {
        return new Promise<Array<Transaction>>((resolve, reject) => {
            HttpClient.get<Array<Transaction>>('frontend-test').then((response: AxiosResponse<Array<Transaction>>) => {
                resolve(Object.values(response.data));
            }).catch((error: AxiosError) => {
                reject(error);
            });
        })
    }
}

export default TransactionServices;