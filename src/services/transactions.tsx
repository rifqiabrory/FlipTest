import { AxiosError, AxiosResponse } from 'axios';
import type { Transaction } from '../types';
import HttpClient from './config/HttpClient';

export const getAllTransactions = () => {
    return new Promise<Array<Transaction>>((resolve, reject) => {
        HttpClient.get<Array<Transaction>>('frontend-test').then((response: AxiosResponse<Array<Transaction>>) => {
            resolve(Object.values(response.data));
        }).catch((error: AxiosError) => {
            reject(error);
        });
    })
}