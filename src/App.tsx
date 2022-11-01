import { useState } from "react";
import "./App.scss";
import "@dnb/eufemia/style";
import TransactionTable from "./features/TransactionTable/TransactionTable";
import { createLongTransactionData, createTransactionData } from "./data";
import { Transaction } from "./types";

export const USE_LONG_LIST = false;
export const USE_VIRTUALIZED_LIST = false;

const data = USE_LONG_LIST ? createLongTransactionData() : createTransactionData();

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(data);

  return (
    <div className="app">
      <header className="app-header">DNB WM S&I Front-End Challenge</header>
      <TransactionTable transactions={transactions} setTransactions={setTransactions} />
    </div>
  );
};

export default App;
