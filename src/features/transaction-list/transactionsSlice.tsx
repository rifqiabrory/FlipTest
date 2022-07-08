import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionServices } from "../../services";
import Utilities, { Strings } from "../../utilities";
import type { Transaction } from "../../types";
import type { RootState } from '../../app/store';

/**
 * Transaction State Interface
 */
interface TransactionState {
    dataSource: Array<Transaction>,
    keyword: string,
    filter: string,
    loading: boolean,
    error?: string
}

/**
 * Transactions Initial State
 */
const initialState: TransactionState = {
    dataSource: [],
    keyword: '',
    filter: 'Urutkan',
    loading: true,
}

/**
 * Retrive Transactions Method
 */
export const retriveTransactions = createAsyncThunk('transactions/all', async (_, { rejectWithValue }) => {
    try {
        const transactions = await TransactionServices.getAllTransactions()
        return transactions;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
})

/**
 * Transactions Selector Method
 * @param state - RootState
 */
export const transactions = (state: RootState) => {
    const { keyword, filter, ...rest } = state.transactions;
    const dataSource = Utilities.filterData(rest.dataSource, filter, keyword);
    return {
        ...state.transactions,
        dataSource
    }
};

/**
 * Transactions Slice Method
 */
const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        onChange: (state, { payload }: PayloadAction<{
            key: string,
            value: string
        }>) => {
            return {
                ...state,
                [payload.key]: payload.value,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(retriveTransactions.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(retriveTransactions.fulfilled, (state, { payload }: PayloadAction<Array<Transaction>>) => {
                state.loading = false;
                state.dataSource = payload;
            }),
            builder.addCase(retriveTransactions.rejected, (state) => {
                state.error = Strings.ERROR_MESSAGE;
                state.loading = false;
            })
    }
});

/**
 * Export Modules
 */
export const { onChange } = transactionsSlice.actions;
export default transactionsSlice.reducer;