import React, { useState } from "react";
import { Button, Input } from "@dnb/eufemia";
import { Transaction } from "../../types";

interface Props {
  transaction: Transaction;
  updateTransaction: (transaction: Transaction) => void;
  style?: React.CSSProperties;
}

const TransactionTableRow = ({ transaction, updateTransaction, style }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(transaction.name);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTransaction({ ...transaction, name });
    setIsEditing(false);
  };

  const date = new Date(transaction.date);

  const form = (
    <form onSubmit={submit}>
      <Input value={name} on_change={({ value }) => setName(value)} size="small"></Input>
    </form>
  );

  return (
    <tr className="dnb-table__tr" style={style}>
      <td className="dnb-table__td">{isEditing ? form : <div>{transaction.name}</div>}</td>
      <td className="dnb-table__td">{`${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} -  ${date.toLocaleDateString()}`}</td>
      <td className="dnb-table__td dnb-table--right">{transaction.amount.toLocaleString()} kr</td>
      <td className="dnb-table__td dnb-table--right">
        <Button
          className="transaction-list-item__edit"
          variant="secondary"
          size="small"
          onClick={() => {
            setIsEditing(!isEditing);
            setName(transaction.name);
          }}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </td>
    </tr>
  );
};

export default TransactionTableRow;
