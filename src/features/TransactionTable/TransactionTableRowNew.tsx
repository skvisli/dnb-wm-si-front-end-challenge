import React, { useRef, useState } from "react";
import "./TransactionTableRowNew.scss";
import { Transaction } from "../../types";
import { Button, Input } from "@dnb/eufemia";
import { v4 as uuidv4 } from "uuid";

interface Props {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  addTransaction: (transaction: Transaction) => void;
}

const TransactionTableRowNew = ({ setIsAdding, addTransaction }: Props) => {
  const dateRef = useRef(new Date());
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const submit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTransaction({ id: uuidv4(), name, date: dateRef.current.getTime(), amount });
  };

  return (
    <tr className="dnb-table__tr">
      <td className="dnb-table__td">
        <form onSubmit={submit}>
          <Input on_change={({ value }) => setName(value)}></Input>
        </form>
      </td>
      <td className="dnb-table__td">{`${dateRef.current.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} -  ${dateRef.current.toLocaleDateString()}`}</td>
      <td className="dnb-table__td dnb-table--right">
        <form onSubmit={submit}>
          <Input type="number" on_change={({ value }) => setAmount(value)}></Input> kr
        </form>
      </td>
      <td className="dnb-table__td dnb-table--right">
        <form onSubmit={submit} className="dnd-table__new-buttons">
          <Button type="submit" variant="secondary" size="small">
            Save
          </Button>
          <Button variant="secondary" size="small" onClick={() => setIsAdding(false)}>
            Cancel
          </Button>
        </form>
      </td>
    </tr>
  );
};

export default TransactionTableRowNew;
