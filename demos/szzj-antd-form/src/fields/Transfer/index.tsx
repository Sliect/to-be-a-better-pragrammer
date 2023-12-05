import Transfer from './Transfer';
import TableTransfer from './TableTransfer';
import TreeTransfer from './TreeTransfer';

type TransferType = typeof Transfer;

interface TransferInterface extends TransferType {
  TableTransfer: typeof TableTransfer;
  TreeTransfer: typeof TableTransfer;
}

const FinalTransfer = Transfer as TransferInterface;
FinalTransfer.TableTransfer = TableTransfer;
FinalTransfer.TreeTransfer = TreeTransfer;

export default FinalTransfer;
