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
import { load } from "./TransactionLoader";
import { ITransaction } from "./TransactionModel";

const TransactionType = new GraphQLObjectType<ITransaction, GraphQLContext>({
  name: "Transaction",
  description: "Represents an Transaction with balance",
  fields: () => ({
    id: globalIdField("Transaction"),
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
    status: {
      type: GraphQLString,
      resolve: (transaction) => transaction.status,
    },
    // paymentType: {
    //   type: GraphQLString,
    //   resolve: (transaction) => transaction.paymentType,
    // },
    transactionType: {
      type: GraphQLString,
      resolve: (transaction) => transaction.transactionType,
    },
    ...objectIdResolver,
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default TransactionType;

registerTypeLoader(TransactionType, load);

export const TransactionConnection = connectionDefinitions({
  name: "Transaction",
  nodeType: TransactionType,
});
