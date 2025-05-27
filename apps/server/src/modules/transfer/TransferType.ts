import {
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
} from "@entria/graphql-mongo-helpers";
import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { globalIdField } from "graphql-relay";
import { GraphQLContext } from "../../graphql/types";
import * as AccountLoader from "../account/AccountLoader";
import AccountType from "../account/AccountType";
import { nodeInterface, registerTypeLoader } from "../node/typeRegister";
import { load } from "./TransferLoader";
import { ITransfer } from "./TransferModel";

const TransferType = new GraphQLObjectType<ITransfer, GraphQLContext>({
  name: "Transfer",
  fields: () => ({
    id: globalIdField("Transfer"),
    description: {
      type: GraphQLString,
      resolve: (transaction) => transaction.description,
    },
    amount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Total amount of the transaction in cents",
      resolve: (transaction) => transaction.amount,
    },
    fromAccount: {
      type: AccountType,
      resolve: async (transaction, _, ctx) => {
        return await AccountLoader.load(ctx, transaction.fromAccount);
      },
    },
    toAccount: {
      type: AccountType,
      resolve: async (transaction, _, ctx) => {
        return await AccountLoader.load(ctx, transaction.toAccount);
      },
    },
    status: {
      type: GraphQLString,
      resolve: (transaction) => transaction.status,
    },
    transactionType: {
      type: GraphQLString,
      resolve: (transaction) => transaction.transactionType,
    },
    ...objectIdResolver,
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default TransferType;

registerTypeLoader(TransferType, load);

export const DepositConnection = connectionDefinitions({
  name: "Transfer",
  nodeType: TransferType,
});
