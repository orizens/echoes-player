import { migrateReducerState } from './store.utils';
const mockJson = {
  sidebarExpanded: true,
  requestInProcess: false
};
const storageMock = {
  getItem: () => JSON.stringify(mockJson),
  removeItem: () => false
};
describe('Reducer Migration with Storage', () => {
  beforeEach(() => {});

  it('should return a new state with previous state values', () => {
    const newState = {
      sidebarExpanded: true,
      requestInProcess: true,
      newProp: 213
    };
    const actual = migrateReducerState('oldKey', newState, storageMock);
    expect(actual.requestInProcess).toBeFalsy();
  });

  it('should return a new state WITHOUT previous state values', () => {
    const newState = {
      sidebarExpanded: true,
      requestInProcess: true,
      newProp: 213
    };
    storageMock.getItem = () => null;
    const actual = migrateReducerState('oldKey', newState, storageMock);
    expect(actual.requestInProcess).toBeTruthy();
  });
});
