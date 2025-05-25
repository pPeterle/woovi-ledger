import { errorField, successField } from "@entria/graphql-mongo-helpers";
import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { startSession } from "mongoose";
import * as AccountLoader from "../../account/AccountLoader.ts";
import AccountModel from "../../account/AccountModel.ts";
import AccountType from "../../account/AccountType.ts";
import LedgerModel from "../../ledger/LedgerModel.ts";
import * as DepositLoader from "../DepositLoader.ts";
import DepositModel, { DepositSource } from "../DepositModel.ts";
import DepositType from "../DepositType.ts";

export type AddDepositInput = {
  source: DepositSource;
  amount: number;
  fromAccount: string;
};

const AddDepositMutation = mutationWithClientMutationId({
  name: "AddDeposit",
  inputFields: {
    source: {
      description: "PIX or BANK",
      type: new GraphQLNonNull(GraphQLString),
    },
    amount: {
      description: "Amount in cents",
      type: new GraphQLNonNull(GraphQLInt),
    },
    fromAccount: {
      description: "Account ID",
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: AddDepositInput) => {
    // TODO: Schema Validation

    const session = await startSession();
    session.startTransaction();

    try {
      const transaction = new DepositModel({
        amount: args.amount,
        source: args.source,
        transactionType: "DEPOSIT",
        fromAccount: args.fromAccount,
        status: "SUCCESS",
      });
      await transaction.save({
        session,
      });

      await AccountModel.updateOne(
        {
          _id: args.fromAccount,
        },
        {
          $inc: { balance: args.amount },
        },
        {
          session,
        }
      );

      const ledger = new LedgerModel({
        amount: args.amount,
        source: args.source,
        fromAccount: args.fromAccount,
        transaction: transaction,
      });

      await ledger.save({ session });

      await session.commitTransaction();
      session.endSession();

      return {
        transactionId: transaction._id,
        accountId: args.fromAccount,
        success: "Deposit created successfully",
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return {
        error: error,
      };
    }
  },
  outputFields: {
    transaction: {
      type: DepositType,
      resolve: async ({ transactionId }, _, context) => {
        return await DepositLoader.load(context, transactionId);
      },
    },
    account: {
      type: AccountType,
      resolve: async ({ accountId }, _, context) => {
        return await AccountLoader.load(context, accountId);
      },
    },
    ...successField,
    ...errorField,
  },
});

export default AddDepositMutation;
