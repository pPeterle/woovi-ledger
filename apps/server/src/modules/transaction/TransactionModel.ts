import mongoose, { Document, Model, Types } from "mongoose";
import { ValueOf } from "../../utils/types";

const { ObjectId } = mongoose.Schema.Types;

const Schema = new mongoose.Schema(
  {
    amount: Number,
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      description: 'Status from transaction: "PENDING", "FAILED" or "SUCCESS"',
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["DEPOSIT", "WITHDRAW", "TRANSFER"],
      description: 'Type of transaction "DEPOSIT", "WITHDRAW" or "TRANSFER"',
      required: true,
    },
    fromAccount: {
      type: ObjectId,
      description: "Origin account that will send the amount sent",
      required: true,
    },
    toAccount: {
      type: ObjectId,
      description: "Destiny account that will receive the amount sent",
      required: true,
    },
    idempotencyKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    collection: "Transaction",
    timestamps: true,
    discriminatorKey: "transactionType",
  }
);

export const TransactionStatus = {
  pending: "PENDING",
  success: "SUCCESS",
  failed: "FAILED",
} as const;

export const TransactionType = {
  deposit: "DEPOSIT",
  withdraw: "WITHDRAW",
  transfer: "TRANSFER",
} as const;

export interface ITransaction extends Document {
  _id: Types.ObjectId;
  amount: number;
  fromAccount: Types.ObjectId;
  toAccount: Types.ObjectId;
  status: ValueOf<typeof TransactionStatus>;
  transactionType: ValueOf<typeof TransactionType>;
  idempotencyKey: string;
  createdAt: Date;
  updatedAt: Date | null;
}

const TransactionModel: Model<ITransaction> =
  mongoose.models["Transaction"] || mongoose.model("Transaction", Schema);

export default TransactionModel;
