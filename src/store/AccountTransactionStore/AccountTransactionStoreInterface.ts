export interface IAccountTransactionStore {
  data: {
    [user: string]: IBankingTransaction[];
  };
  number: 0;
  filterByText?: string | undefined;
  filterByDate?: string | undefined;
}
export interface IBankingTransaction {
  title: string;
  amount: number;
  date: string;
  uniqueId: number;
}
export interface IBankingTransactionMissingID {
  title: string;
  amount: number;
  date: string;
}
