import { createLoader } from "@entria/graphql-mongo-helpers";

import { registerLoader } from "../loader/loaderRegister.ts";
import LedgerModel from "./LedgerModel.ts";

const {
  Wrapper: Ledger,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: LedgerModel,
  loaderName: "LedgerLoader",
});

export { clearCache, getLoader, load, loadAll };
export default Ledger;

registerLoader("LedgerLoader", getLoader);
