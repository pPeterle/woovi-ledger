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
  fields: () => ({
    id: globalIdField("Ledger"),
    description: {
      type: GraphQLString,
    },
    amount: {
      type: GraphQLInt,
      description: "Amount in cents",
      resolve: (ledger) => ledger.amount,
    },
    finalBalance: {
      type: GraphQLInt,
      description: "Account balance after this ledger entry",
      resolve: (ledger) => ledger.finalBalance,
    },
    ledgerEntryType: {
      type: GraphQLString,
      description: "Ledger entry type 'CREDIT' | 'DEBIT' ",
      resolve: (ledger) => ledger.ledgerEntryType,
    },
    transaction: {
      type: TransactionType,
      resolve: async (ledger, _, ctx) => {
        return TransactionLoader.load(ctx, ledger.transaction);
      },
    },
    account: {
      type: AccountType,
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
