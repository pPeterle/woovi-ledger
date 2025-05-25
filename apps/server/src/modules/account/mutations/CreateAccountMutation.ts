import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import * as AccountLoader from "../AccountLoader.ts";
import AccountModel from "../AccountModel.ts";
import AccountType from "../AccountType.ts";

export type CreateAccountInput = {
  name: string;
};

const mutation = mutationWithClientMutationId({
  name: "AddAccount",
  inputFields: {
    name: {
      description: "Name of the account",
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: CreateAccountInput) => {
    // TODO: schema validation

    const account = await AccountModel.create({
      accountName: args.name,
      balance: 0,
    });

    return {
      id: account._id,
      error: null,
    };
  },
  outputFields: {
    account: {
      type: AccountType,
      resolve: async ({ id }, _, context) => {
        return await AccountLoader.load(context, id);
      },
    },
  },
});

export default mutation;
