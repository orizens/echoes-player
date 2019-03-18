/**
 * migrate reducer strategy
 */
export function migrateReducerState(
  prevReducerKey: string,
  newReducerState: any
): any {
  const prevReducerState = localStorage.getItem(prevReducerKey);
  const prevStateJson =
    prevReducerState && prevReducerState.length > 0
      ? JSON.parse(prevReducerState)
      : false;
  if (prevStateJson) {
    localStorage.removeItem(prevReducerKey);
  }
  return prevStateJson
    ? { ...newReducerState, ...prevStateJson }
    : newReducerState;
}
