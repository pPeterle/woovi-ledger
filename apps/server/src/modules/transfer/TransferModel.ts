import mongoose, { Model } from "mongoose";
import TransactionModel, {
  ITransaction,
} from "../transaction/TransactionModel";

const Schema = new mongoose.Schema({
  description: {
    type: String,
  },
});

export interface ITransfer extends ITransaction {
  description: string;
}

const TransferModel: Model<ITransfer> = TransactionModel.discriminator(
  "TRANSFER",
  Schema
);

export default TransferModel;
