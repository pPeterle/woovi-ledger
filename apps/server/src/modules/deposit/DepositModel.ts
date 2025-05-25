import mongoose, { Model } from "mongoose";
import TransactionModel, {
  ITransaction,
} from "../transaction/TransactionModel";

const Schema = new mongoose.Schema({
  source: {
    type: String,
    enum: ["PIX", "BANK"],
    description: 'Status from transaction: "PIX" or "TED" ',
    required: true,
  },
});

export type DepositSource = "PIX" | "TED";

export interface IDeposit extends ITransaction {
  source: DepositSource;
}

const DepositModel: Model<IDeposit> = TransactionModel.discriminator(
  "DEPOSIT",
  Schema
);

export default DepositModel;
