export interface IAccountTransactionStore {
  data: {
    [user: string]: IBankingTransaction[];
  };
  number: 0;
}
export interface IBankingTransaction {
  title: string;
  amount: number;
  date: Date;
  uniqueId: number;
}
export interface IBankingTransactionMissingID {
  title: string;
  amount: number;
  date: Date;
}
