import { errorField, successField } from "@entria/graphql-mongo-helpers";
import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { startSession } from "mongoose";
import { z } from "zod/v4";
import * as AccountLoader from "../../account/AccountLoader.ts";
import AccountModel, { AccountActionType } from "../../account/AccountModel.ts";
import AccountType from "../../account/AccountType.ts";
import LedgerModel, { LedgetEntryType } from "../../ledger/LedgerModel.ts";
import TransactionModel, {
  TransactionStatus,
  TransactionType,
} from "../../transaction/TransactionModel.ts";
import * as DepositLoader from "../DepositLoader.ts";
import DepositModel, { DepositSource } from "../DepositModel.ts";
import DepositType from "../DepositType.ts";

const schema = z.object({
  source: z.enum(DepositSource),
  amount: z.int().min(100),
  fromAccountId: z.string(),
  idempotencyKey: z.string(),
});

export type CreateDepositInput = z.infer<typeof schema>;

const CreateDepositMutation = mutationWithClientMutationId({
  name: "CreateDeposit",
  inputFields: {
    source: {
      description: "PIX or BANK",
      type: new GraphQLNonNull(GraphQLString),
    },
    amount: {
      description: "Amount in cents",
      type: new GraphQLNonNull(GraphQLInt),
    },
    fromAccountId: {
      description: "Account ID",
      type: new GraphQLNonNull(GraphQLString),
    },
    idempotencyKey: {
      description: "Unique key for this transaction",
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: CreateDepositInput) => {
    schema.parse(args);

    const existTransactionWithIdempotencyKey = await TransactionModel.findOne({
      idempotencyKey: args.idempotencyKey,
    });

    if (existTransactionWithIdempotencyKey) {
      return {
        transactionId: existTransactionWithIdempotencyKey._id,
        accountId: existTransactionWithIdempotencyKey.fromAccount._id,
        success: "Deposit already created.",
      };
    }

    const existsAssetAccount = AccountModel.exists({
      id: args.fromAccountId,
    });

    const existsIncomeAccount = AccountModel.exists({
      accountType: AccountActionType.deposit,
    });

    const [assetAccount, incomeAccount] = await Promise.all([
      existsAssetAccount,
      existsIncomeAccount,
    ]);

    // TODO: throw custom error
    if (!assetAccount) throw Error("Asset account not found");
    if (!incomeAccount) throw Error("Income account not found");

    const session = await startSession();
    session.startTransaction();

    try {
      const deposit = new DepositModel({
        amount: args.amount,
        source: args.source,
        transactionType: TransactionType.deposit,
        fromAccount: args.fromAccountId,
        toAccount: incomeAccount?._id,
        status: TransactionStatus.success,
        idempotencyKey: args.idempotencyKey,
      });
      await deposit.save({
        session,
      });

      const assetAccountBalance = await AccountModel.findByIdAndUpdate(
        {
          _id: args.fromAccountId,
        },
        {
          $inc: { balance: args.amount },
        },
        {
          session,
        }
      );

      const incomeAccountBalance = await AccountModel.findByIdAndUpdate(
        {
          _id: incomeAccount._id,
        },
        {
          $inc: { balance: -args.amount },
        },
        {
          session,
        }
      );

      const incomeLedger = new LedgerModel({
        amount: args.amount,
        source: args.source,
        account: incomeAccount._id,
        transaction: deposit,
        ledgerEntryType: LedgetEntryType.debit,
        finalBalance: incomeAccountBalance!.balance,
      });

      const assetLedger = new LedgerModel({
        amount: args.amount,
        source: args.source,
        account: args.fromAccountId,
        transaction: deposit,
        ledgerEntryType: LedgetEntryType.credit,
        finalBalance: assetAccountBalance!.balance,
      });

      await LedgerModel.create([incomeLedger, assetLedger], {
        session,
      });

      await session.commitTransaction();
      session.endSession();

      return {
        transactionId: deposit._id,
        accountId: args.fromAccountId,
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

export default CreateDepositMutation;
