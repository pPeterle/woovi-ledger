import mongoose, { Model, Types } from "mongoose";
import TransactionModel, {
  ITransaction,
} from "../transaction/TransactionModel";

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema({
  toAccount: {
    type: ObjectId,
    description: "Origin account that will send the amount sent",
    required: true,
  },
});

export interface ITransfer extends ITransaction {
  toAccount: Types.ObjectId;
}

const TransferModel: Model<ITransfer> = TransactionModel.discriminator(
  "TRANSFER",
  Schema
);

export default TransferModel;
