import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  value: number;
  title: string;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let balance: Balance = { income: 0, outcome: 0, total: 0 }
    this.transactions.map((transaction) => {
      if (transaction.type === "outcome") {
        balance.outcome += transaction.value
      }
      if (transaction.type === "income") {
        balance.income += transaction.value
      }
    })
    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
