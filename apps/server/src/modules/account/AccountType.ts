import {
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
} from "@entria/graphql-mongo-helpers";
import { GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField } from "graphql-relay";
import { GraphQLContext } from "../../graphql/types";
import { nodeInterface, registerTypeLoader } from "../node/typeRegister";
import { load } from "./AccountLoader";
import { IAccount } from "./AccountModel";

const AccountType = new GraphQLObjectType<IAccount, GraphQLContext>({
  name: "Account",
  fields: () => ({
    id: globalIdField("Account"),
    accountName: {
      type: GraphQLString,
      resolve: (account) => account.accountName,
    },
    accountActionType: {
      type: GraphQLString,
      resolve: (account) => account.accountActionType,
    },
    balance: {
      type: GraphQLString,
      resolve: (account) => account.balance,
    },
    deletedAt: {
      type: GraphQLString,
      resolve: (account) =>
        account.deletedAt ? account.deletedAt.toISOString() : null,
    },
    ...objectIdResolver,
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default AccountType;

registerTypeLoader(AccountType, load);

export const AccountConnection = connectionDefinitions({
  name: "Account",
  nodeType: AccountType,
});
