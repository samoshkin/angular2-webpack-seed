import { createReducer } from './create-reducer';
import { when, success, error, progress } from './action-filter-reducer.ts';

export interface TransactionState {
  progress: boolean;
  success: boolean;
  completed: boolean;
  error: any;
  transaction: any; // action
}

export function transactionStateReducer(transaction) {

  function belongsToCurrentTransaction(reducer) {
    return (state, action) => {
      return state.transaction === action.meta.transaction
        ? reducer(state, action)
        : state;
    };
  }

  return createReducer(
    {
      progress: false,
      completed: false,
      error: null,
      success: null,
      transaction: null
    },
    when(transaction, (state, action) => ({
      progress: true,
      completed: false,
      error: null,
      success: null,
      transaction: action
    })),
    when(progress(transaction), belongsToCurrentTransaction((state, action) => Object.assign({}, state, {
      progress: action.payload
    }))),
    when(success(transaction), belongsToCurrentTransaction((state, action) => Object.assign({}, state, {
      success: true,
      error: null,
      completed: true,
      progress: false
    }))),
    when(error(transaction), belongsToCurrentTransaction((state, action) => Object.assign({}, state, {
      success: false,
      error: action.payload,
      completed: true,
      progress: false
    })))
  );
}
