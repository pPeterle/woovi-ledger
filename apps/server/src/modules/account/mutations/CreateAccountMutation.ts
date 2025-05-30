import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { z } from "zod/v4";
import * as AccountLoader from "../AccountLoader.ts";
import AccountModel from "../AccountModel.ts";
import AccountType from "../AccountType.ts";

const schema = z.object({
  accountName: z.string().min(5),
});

export type CreateAccountInput = z.infer<typeof schema>;

const mutation = mutationWithClientMutationId({
  name: "AddAccount",
  inputFields: {
    name: {
      description: "Name of the account",
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: CreateAccountInput) => {
    schema.parse(args);

    const account = await AccountModel.create({
      accountName: args.accountName,
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
