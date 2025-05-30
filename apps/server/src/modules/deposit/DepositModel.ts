import mongoose, { Model } from "mongoose";
import { ValueOf } from "../../utils/types";
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

export const DepositSource = {
  pix: "PIX",
  ted: "TED",
} as const;

export interface IDeposit extends ITransaction {
  source: ValueOf<typeof DepositSource>;
}

const DepositModel: Model<IDeposit> = TransactionModel.discriminator(
  "DEPOSIT",
  Schema
);

export default DepositModel;
