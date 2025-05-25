import mongoose, { Document, Model, Types } from "mongoose";

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
    // paymentType: {
    //   type: String,
    //   enum: ["PIX", "CREDIT", "DEBIT"],
    //   description: 'Type of operation "PIX", "CREDIT" or "DEBIT"',
    //   required: true,
    // },
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
  },
  {
    collection: "Transaction",
    timestamps: true,
    discriminatorKey: "transactionType",
  }
);

export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";
//export type PaymentType = "CREDIT" | "DEBIT" | "PIX";
export type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER";

export interface ITransaction extends Document {
  _id: Types.ObjectId;
  amount: number;
  fromAccount: Types.ObjectId;
  status: TransactionStatus;
  //paymentType: PaymentType;
  transactionType: TransactionType;
  createdAt: Date;
  updatedAt: Date | null;
}

const TransactionModel: Model<ITransaction> =
  mongoose.models["Transaction"] || mongoose.model("Transaction", Schema);

export default TransactionModel;
