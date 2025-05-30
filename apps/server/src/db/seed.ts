import mongoose from "mongoose";
import AccountModel, {
  AccountActionType,
} from "../modules/account/AccountModel";
import { connectDatabase } from "./database";

const createSeed = async () => {
  await connectDatabase();
  await new AccountModel({
    accountName: "Externa-Service-Deposit",
    accountActionType: AccountActionType.deposit,
  }).save();

  await mongoose.connection.close();
};

createSeed()
  .then(() => {
    console.log("Seed Created");
    process.exit(0);
  })
  .catch((error) => {
    console.log("Seed Error:", error);
  });
