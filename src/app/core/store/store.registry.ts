interface IStoreRegistry {
  reducers: {};
  actions: any[];
}
interface StoreReducerPackage {
  reducer: {};
  actions: any;
}

export class StoreRegistry {
  static reducers = {};
  static actions = [];
};

export function registerReducers(reducersRegisters: StoreReducerPackage[]): IStoreRegistry {
  reducersRegisters.forEach(reducerRegistry => registerReducer(reducerRegistry));
  return StoreRegistry;
}

export function registerReducer(reducerPackage: StoreReducerPackage) {
  addReducer(reducerPackage.reducer);
  addActions(reducerPackage.actions);
}

function addReducer(reducer) {
  Object.assign(StoreRegistry.reducers, reducer);
  return StoreRegistry.reducers;
};

function addActions(actionsClass) {
  StoreRegistry.actions.push(actionsClass);
  return StoreRegistry.actions;
}
