import mongoose from "mongoose";
import { DataLoaders } from "../modules/loader/loaderRegister";

declare type ObjectId = mongoose.Schema.Types.ObjectId;

export type GraphQLContext = {
  dataloaders: DataLoaders;
};

export type LoaderFn = (
  ctx: GraphQLContext,
  id: string | ObjectId | object
) => any;
