import type { Document, Model } from "mongoose";
import mongoose, { type Types } from "mongoose";
import { ValueOf } from "../../utils/types";

export const AccountActionType = {
  deposit: "DEPOSIT",
  withdraw: "WITHDRAW",
} as const;

export interface IAccount extends Document {
  _id: Types.ObjectId;
  accountName: string;
  balance: number;
  accountActionType: ValueOf<typeof AccountActionType>;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

const Schema = new mongoose.Schema<IAccount>(
  {
    accountName: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
    accountActionType: {
      type: String,
      enum: ["DEPOSIT", "WITHDRAW"],
      description: 'Type of transaction "DEPOSIT", "WITHDRAW" or "TRANSFER"',
      unique: true,
    },
  },
  {
    collection: "Account",
    timestamps: true,
  }
);

const AccountModel: Model<IAccount> =
  mongoose.models["Account"] || mongoose.model("Account", Schema);

export default AccountModel;
