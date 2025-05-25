import { createLoader } from "@entria/graphql-mongo-helpers";

import { registerLoader } from "../loader/loaderRegister.ts";
import DepositModel from "./DepositModel.ts";

const {
  Wrapper: Deposit,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: DepositModel,
  loaderName: "DepositLoader",
});

export { clearCache, getLoader, load, loadAll };
export default Deposit;

registerLoader("DepositLoader", getLoader);
