import { createLoader } from "@entria/graphql-mongo-helpers";

import { registerLoader } from "../loader/loaderRegister.ts";
import TransactionModel from "./TransactionModel.ts";

const {
  Wrapper: Transaction,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: TransactionModel,
  loaderName: "TransactionLoader",
});

export { clearCache, getLoader, load, loadAll };
export default Transaction;

registerLoader("TransactionLoader", getLoader);
