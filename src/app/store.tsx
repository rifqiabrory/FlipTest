import { configureStore } from '@reduxjs/toolkit';
import transactionsSlice from '../features/transaction-list/transactionsSlice';

/**
 * Config Redux Store
 */
export const store = configureStore({
    reducer: {
        transactions: transactionsSlice,
    },
})

/**
 * Get Root State & App Dispatch
 */
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;