import { createLoader } from "@entria/graphql-mongo-helpers";

import { registerLoader } from "../loader/loaderRegister.ts";
import TransferModel from "./TransferModel.ts";

const {
  Wrapper: Transfer,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: TransferModel,
  loaderName: "TransferLoader",
});

export { clearCache, getLoader, load, loadAll };
export default Transfer;

registerLoader("TransferLoader", getLoader);
