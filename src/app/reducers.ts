import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { success } from './action-helpers';
import { loadAllTasks, changeTaskStatus } from './actions';

export interface AppState {
  tasks: Task[];
}

export enum TaskStatus {
  New = 1,
  Progress,
  Done
}

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
};

const tasks = (state = [], action) => {
  const { payload } = action;

  if (success(loadAllTasks).type === action.type) {
    return action.payload;
  }

  if (changeTaskStatus.type === action.type) {
    return state.map(t => t.id === payload.id
      ? Object.assign({}, t, { status: payload.status })
      : t);
  }

  return state;
};

// export default combineReducers({ tasks });

export default compose(
  storeLogger()
)(combineReducers({ tasks }));


