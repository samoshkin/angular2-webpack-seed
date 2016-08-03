export function indexedByReducer(indexedBy) {
  return reducer => (state, action) => {
    console.log('indexedBy', action);
    const index = indexedBy(action);
    return Object.assign({}, state, {
      [index]: reducer(state[index], action)
    });
  };
}
