import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllTransactions } from "../../services/transactions";
import { Transaction } from "../../types";
import Utilities from "../../utilities";
import type { RootState } from '../../app/store';

interface TransactionState {
    dataSource: Array<Transaction>,
    keyword: string,
    filter: string,
    loading: boolean,
    error?: string
}

const initialState: TransactionState  = {
    dataSource: [],
    keyword: '',
    filter: 'Urutkan',
    loading: true,
}

export const retriveTransactions = createAsyncThunk('transactions/all', async (_, { rejectWithValue }) => {
    try {
        const transactions = await getAllTransactions()
        return transactions;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
})

export const transactions = (state: RootState) => {
    const { keyword, filter, ...rest } = state.transactions;
    const dataSource = Utilities.filterData(rest.dataSource, filter, keyword);
    return {
        ...state.transactions,
        dataSource
    }
};

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
        builder.addCase(retriveTransactions.rejected, (state, arg) => {
            state.error = "Something want wrong!";
            state.loading = false;
        })
    }
});

export const { onChange } = transactionsSlice.actions;
export default transactionsSlice.reducer;