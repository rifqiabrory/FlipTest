type Status = "SUCCESS" | "PENDING";

/**
 * Transaction Interface
 */
export interface Transaction {
    id: string,
    amount: number
    unique_code: number,
    status: Status,
    sender_bank: string,
    account_number: number,
    beneficiary_name: string,
    beneficiary_bank: string,
    remark: string,
    created_at: string,
    completed_at: string,
    fee: number
}

/**
 * Stack Params Interface
 */
export type StackParams = {
    Transaction: undefined,
    TransactionDetail: {
        transactionID: string
    }
    FilterModal: undefined
};