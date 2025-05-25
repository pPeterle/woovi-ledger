import { GraphQLObjectType } from "graphql";
import { connectionArgs } from "graphql-relay";
import * as AccountLoader from "../modules/account/AccountLoader.ts";
import { AccountConnection } from "../modules/account/AccountType.ts";
import * as DepositLoader from "../modules/deposit/DepositLoader.ts";
import { DepositConnection } from "../modules/deposit/DepositType.ts";
import { nodeField, nodesField } from "../modules/node/typeRegister";
import * as TransactionLoader from "../modules/transaction/TransactionLoader.ts";
import { TransactionConnection } from "../modules/transaction/TransactionType.ts";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    account: {
      type: AccountConnection.connectionType,
      args: {
        ...connectionArgs,
      },
      resolve: (root, args, context) => AccountLoader.loadAll(context, args),
    },
    transaction: {
      type: TransactionConnection.connectionType,
      args: {
        ...connectionArgs,
      },
      resolve: (root, args, context) =>
        TransactionLoader.loadAll(context, args),
    },
    deposit: {
      type: DepositConnection.connectionType,
      args: {
        ...connectionArgs,
      },
      resolve: (root, args, context) => DepositLoader.loadAll(context, args),
    },
  }),
});
