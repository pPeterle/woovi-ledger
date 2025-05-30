import mongoose from "mongoose";
import AccountModel, { accountType } from "../modules/account/AccountModel";
import { connectDatabase } from "./database";

const createSeed = async () => {
  await connectDatabase();
  await new AccountModel({
    accountName: "Externa-Service-Deposit",
    accountType: accountType.deposit,
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
