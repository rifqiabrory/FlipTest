type Status = "SUCCESS" | "PENDING";

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

export type StackParams = {
    Transaction: undefined,
    TransactionDetail: {
        transaction: Transaction
    }
    SortModal: {
        filter: string,
        onFilterSeleted: (text: string) => void
    }
};