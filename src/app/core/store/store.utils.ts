/**
 * migrate reducer strategy
 */
export function migrateReducerState(
  prevReducerKey: string,
  newReducerState: any,
  storage: { getItem: Function; removeItem: Function }
): any {
  const prevReducerState = storage.getItem(prevReducerKey);
  const prevStateJson =
    prevReducerState && prevReducerState.length > 0
      ? JSON.parse(prevReducerState)
      : false;
  if (prevStateJson) {
    storage.removeItem(prevReducerKey);
  }
  return prevStateJson
    ? { ...newReducerState, ...prevStateJson }
    : newReducerState;
}
