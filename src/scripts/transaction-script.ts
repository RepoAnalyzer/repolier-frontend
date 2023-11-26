export interface TransactionScript<RunReturnType = void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    run: (...args: any[]) => RunReturnType
}

