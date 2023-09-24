export interface IAccountTransactionStore {
  data: {
    [user: string]: IBankingTransaction[];
  };
}
export interface IBankingTransaction {
  title: string;
  amount: number;
  date: Date;
}
