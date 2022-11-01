import React, { useEffect, useState } from "react";
import { Button, Heading, Input, Table } from "@dnb/eufemia";
import classNames from "classnames";
import "./TransactionTable.scss";
import { Transaction } from "../../types";
import useFilteredList from "../../hooks/useFilteredList";
import { USE_VIRTUALIZED_LIST } from "../../App";
import TransactionTableVirtualized from "./TransactionTableVirtualized";
import TransactionTableRowNew from "./TransactionTableRowNew";
import TransactionTableRow from "./TransactionTableRow";

interface Props {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const TransactionTable = ({ transactions, setTransactions }: Props) => {
  const [filteredTransactions, debouncedSetSearchString] = useFilteredList({
    list: transactions,
    filterKeys: ["name", "amount"],
  });
  const [sort, setSort] = useState<{ by: "name" | "date"; order: "asc" | "desc" }>({
    by: "date",
    order: "asc",
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => sortByDate(), []);

  const updateTransaction = (updatedTransaction: Transaction) => {
    const index = transactions.findIndex((trans) => trans.id === updatedTransaction.id);
    const newTransactions = [...transactions];
    newTransactions.splice(index, 1, updatedTransaction);
    setTransactions(newTransactions);
  };

  const addTransaction = (newTransaction: Transaction) => {
    const newTransactions = [...transactions];
    newTransactions.push(newTransaction);
    setTransactions(newTransactions);
    setIsAdding(false);
  };

  const sortByName = () => {
    const newTransactions = [...transactions];
    newTransactions.sort((a, b) => a.name.localeCompare(b.name));
    if (sort.by !== "name" || sort.order === "asc") {
      setSort({ by: "name", order: "desc" });
    } else {
      newTransactions.reverse();
      setSort({ by: "name", order: "asc" });
    }
    setTransactions(newTransactions);
  };

  const sortByDate = () => {
    const newTransactions = [...transactions];
    newTransactions.sort((a, b) => a.date - b.date);
    if (sort.by !== "date" || sort.order === "asc") {
      newTransactions.reverse();
      setSort({ by: "date", order: "desc" });
    } else {
      setSort({ by: "date", order: "asc" });
    }
    setTransactions(newTransactions);
  };

  return (
    <div className="container">
      <Heading size="x-large">Transactions:</Heading>
      <div className="dnb-table__action-bar">
        <Input placeholder="Search..." on_change={({ value }) => debouncedSetSearchString(value)}></Input>
        <Button onClick={() => setIsAdding(true)} icon="add">
          Add transaction
        </Button>
      </div>
      <Table className="dnb-table">
        <thead className="dnb-table__head">
          <tr className="dnb-table__tr">
            <th
              scope="col"
              className={classNames("dnb-table__th dnb-table--sortable dnb-table__name", {
                "dnd-table--active": sort.by === "name",
                "dnb-table--reversed": sort.order === "desc",
              })}
            >
              <Button
                variant="tertiary"
                icon="arrow-down"
                text="Name"
                title="dnb-table__th dnb-table--sortable"
                wrap="true"
                onClick={sortByName}
              />
            </th>
            <th
              scope="col"
              className={classNames("dnb-table__th dnb-table--sortable", {
                "dnd-table--active": sort.by === "date",
                "dnb-table--reversed": sort.order === "desc",
              })}
            >
              <Button
                variant="tertiary"
                icon="arrow-down"
                text="Date"
                title="dnb-table__th dnb-table--sortable dnb-table--active"
                wrap="true"
                onClick={sortByDate}
              />
            </th>
            <th scope="col" className="dnb-table__th dnb-table--right">
              Amount
            </th>
            <th className="dnb-table__th dnb-table__edit"></th>
          </tr>
        </thead>
        <tbody>
          {isAdding && <TransactionTableRowNew setIsAdding={setIsAdding} addTransaction={addTransaction} />}
          {USE_VIRTUALIZED_LIST ? (
            <TransactionTableVirtualized transactions={filteredTransactions} updateTransaction={updateTransaction} />
          ) : (
            filteredTransactions.map((trans) => (
              <TransactionTableRow
                key={trans.id}
                transaction={trans}
                updateTransaction={updateTransaction}
              ></TransactionTableRow>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionTable;
