import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllTransactions } from "../../services/transactions";
import { Transaction } from "../../types";
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

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        onFetching: (state) => {
            const data = state.dataSource.sort((a, b) => {
                switch(state.filter) {
                    case 'Nama A-Z': {
                        if(a.beneficiary_name < b.beneficiary_name) { return -1; }
                        if(a.beneficiary_name > b.beneficiary_name) { return 1; }
                        return 0
                    }
                    case 'Nama Z-A': {
                        if(a.beneficiary_name < b.beneficiary_name) { return 1; }
                        if(a.beneficiary_name > b.beneficiary_name) { return -1; }
                        return 0
                    }
                    default: {
                        return 0;
                    }
                }
            })
            return {
                ...state,
                dataSource: data
            }
        },
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

export const { onFetching, onChange } = transactionsSlice.actions;
export const transactions = (state: RootState) => state.transactions;
export default transactionsSlice.reducer;