export interface DataLoaders {
  AccountLoader: ReturnType<
    typeof import("../account/AccountLoader").getLoader
  >;
  TransactionLoader: ReturnType<
    typeof import("../transaction/TransactionLoader").getLoader
  >;
  LedgerLoader: ReturnType<typeof import("../ledger/LedgerLoader").getLoader>;
  DepositLoader: ReturnType<
    typeof import("../deposit/DepositLoader").getLoader
  >;
  TransferLoader: ReturnType<
    typeof import("../transfer/TransferLoader").getLoader
  >;
}

const loaders: {
  [Name in keyof DataLoaders]: () => DataLoaders[Name];
} = {} as any;

const registerLoader = <Name extends keyof DataLoaders>(
  key: Name,
  getLoader: () => DataLoaders[Name]
) => {
  loaders[key] = getLoader as any;
};

const getDataloaders = (): DataLoaders =>
  (Object.keys(loaders) as (keyof DataLoaders)[]).reduce(
    (prev, loaderKey) => ({
      ...prev,
      [loaderKey]: loaders[loaderKey](),
    }),
    {}
  ) as any;

export { getDataloaders, registerLoader };
