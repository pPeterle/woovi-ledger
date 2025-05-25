import {
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
} from "@entria/graphql-mongo-helpers";
import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField } from "graphql-relay";
import * as AccountLoader from "../account/AccountLoader";
import AccountType from "../account/AccountType";
import { nodeInterface, registerTypeLoader } from "../node/typeRegister";
import * as TransactionLoader from "../transaction/TransactionLoader";
import TransactionType from "../transaction/TransactionType";
import * as LedgerLoader from "./LedgerLoader";
import { ILedger } from "./LedgerModel";

const LedgerType = new GraphQLObjectType<ILedger>({
  name: "Ledger",
  description: "Represents a ledger entry for financial transactions",
  fields: () => ({
    id: globalIdField("Ledger"),
    description: {
      type: GraphQLString,
    },
    amount: {
      type: GraphQLInt,
      description:
        "Amount of the transaction (positive for credit, negative for debit)",
      resolve: (ledger) => ledger.amount,
    },
    finalBalance: {
      type: GraphQLInt,
      description: "Account balance after this transaction",
      resolve: (ledger) => ledger.finalBalance,
    },
    transactionType: {
      type: GraphQLString,
      description: "Type of ledger entry (CREDIT or DEBIT)",
      resolve: (ledger) => ledger.transactionType,
    },
    transaction: {
      type: TransactionType,
      description: "The transaction associated with this ledger entry",
      resolve: async (ledger, _, ctx) => {
        return TransactionLoader.load(ctx, ledger.transaction);
      },
    },
    account: {
      type: AccountType,
      description: "The account associated with this ledger entry",
      resolve: async (ledger, _, ctx) => {
        return AccountLoader.load(ctx, ledger.account);
      },
    },
    ...objectIdResolver,
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

const LedgerConnection = connectionDefinitions({
  name: "Ledger",
  nodeType: LedgerType,
});

registerTypeLoader(LedgerType, LedgerLoader.load);

export { LedgerConnection, LedgerType };
