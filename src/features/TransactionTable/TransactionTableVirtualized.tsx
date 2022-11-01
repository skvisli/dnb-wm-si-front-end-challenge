import { FixedSizeList } from "react-window";
import { Transaction } from "../../types";
import TransactionTableRow from "./TransactionTableRow";

interface Props {
  transactions: Transaction[];
  updateTransaction: (transaction: Transaction) => void;
}

const TransactionTableVirtualized = ({ transactions, updateTransaction }: Props) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <TransactionTableRow
      style={{ ...style, display: "flex" }}
      key={transactions[index].id}
      transaction={transactions[index]}
      updateTransaction={updateTransaction}
    ></TransactionTableRow>
  );
  return (
    <FixedSizeList
      height={document.documentElement.clientHeight}
      itemCount={transactions.length}
      itemSize={64}
      width={1000}
    >
      {Row}
    </FixedSizeList>
  );
};

export default TransactionTableVirtualized;
