import reduceReducers from 'reduce-reducers';

interface Reducer<TState> {
  (state: TState, action): TState;
}

export function createReducer<TState>(initialState?: any, ...reducers: Reducer<TState>[]): Reducer<TState> {
  return reduceReducers([
    (state: TState, action): TState => {
      if (typeof state === 'undefined') {
        return typeof initialState === 'function' ? initialState() : initialState;
      }
      return state;
    },
    ...reducers
  ]);
}
