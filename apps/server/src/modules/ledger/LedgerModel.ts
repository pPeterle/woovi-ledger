import mongoose, { Document, Model, Types } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

export interface ILedger extends Document {
  _id: Types.ObjectId;
  transaction: Types.ObjectId;
  account: Types.ObjectId;
  amount: number;
  finalBalance: number;
  transactionType: "CREDIT" | "DEBIT";
  idempotencyKey: string;
  createdAt: Date;
  updatedAt: Date | null;
}

const Schema = new mongoose.Schema<ILedger>(
  {
    transaction: {
      type: ObjectId,
      ref: "Transaction",
      required: true,
    },
    account: {
      type: ObjectId,
      ref: "Account",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    finalBalance: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["CREDIT", "DEBIT"],
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
    collection: "Ledger",
    timestamps: true,
  }
);

const LedgerModel: Model<ILedger> =
  mongoose.models["Account"] || mongoose.model("Account", Schema);

export default LedgerModel;
