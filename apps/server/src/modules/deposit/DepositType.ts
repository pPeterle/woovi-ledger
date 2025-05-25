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
import { load } from "./DepositLoader";
import { IDeposit } from "./DepositModel";

const DepositType = new GraphQLObjectType<IDeposit, GraphQLContext>({
  name: "Deposit",
  description: "Represents an Transaction with balance",
  fields: () => ({
    id: globalIdField("Deposit"),
    source: {
      type: GraphQLString,
      resolve: (deposit) => deposit.source,
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

export default DepositType;

registerTypeLoader(DepositType, load);

export const DepositConnection = connectionDefinitions({
  name: "Deposit",
  nodeType: DepositType,
});
