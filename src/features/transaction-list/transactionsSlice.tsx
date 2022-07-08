import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Option } from "../../components/RadioButtonGroup";
import { TransactionServices } from "../../services";
import Utilities, { FilterOptions, Strings } from "../../utilities";
import type { Transaction } from "../../types";
import type { RootState } from '../../app/store';

/**
 * Transaction State Interface
 */
interface TransactionState {
    dataSource: Array<Transaction>,
    keyword: string,
    filter: Option,
    loading: boolean,
    error?: string
}

/**
 * Transaction Initial State
 */
const initialState: TransactionState = {
    dataSource: [],
    keyword: '',
    filter: FilterOptions[0],
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
export const transactions = ({ transactions } : RootState) => {
    const { keyword, filter, ...rest } = transactions;
    const dataSource = Utilities.filterData(rest.dataSource, filter.value, keyword);
    return {
        ...transactions,
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
            value: any
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
            state.loading = false;
            state.error = Strings.ERROR_MESSAGE;
        })
    }
});

/**
 * Export Modules
 */
export const { onChange } = transactionsSlice.actions;
export default transactionsSlice.reducer;