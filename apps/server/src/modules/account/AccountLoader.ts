import { createLoader } from "@entria/graphql-mongo-helpers";

import { registerLoader } from "../loader/loaderRegister.ts";
import AccountModel from "./AccountModel.ts";

const {
  Wrapper: Account,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: AccountModel,
  loaderName: "AccountLoader",
});

export { clearCache, getLoader, load, loadAll };
export default Account;

registerLoader("AccountLoader", getLoader);
