import { GraphQLObjectType } from "graphql";
import AccountMutations from "../modules/account/mutations";
import DepositMutations from "../modules/deposit/mutations";

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...AccountMutations,
    ...DepositMutations,
  }),
});
