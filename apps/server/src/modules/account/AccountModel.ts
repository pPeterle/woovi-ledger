import type { Document, Model } from "mongoose";
import mongoose, { Types } from "mongoose";

export interface IAccount extends Document {
  _id: Types.ObjectId;
  accountName: string;
  balance: number;
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
  },
  {
    collection: "Account",
    timestamps: true,
  }
);

const AccountModel: Model<IAccount> =
  mongoose.models["Account"] || mongoose.model("Account", Schema);

export default AccountModel;
