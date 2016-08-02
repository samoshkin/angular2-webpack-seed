import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { success, error } from './action-helpers';
import { loadAllTasks, loadTaskById, changeTaskStatus } from './actions';
import { Observable } from 'rxjs/Observable';
import '@ngrx/core/add/operator/select';

export interface AppState {
  tasks: Task[];
  loadTaskByIdProgress: LoadTaskByIdProgress;
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

export interface LoadTaskByIdProgress {
  [id: number]: boolean;
}


// nested selector
function getTaskByIdProgressInner(id: number) {
  return (state: Observable<LoadTaskByIdProgress>) => state.select(s => s[id]);
}

export function getTaskByIdProgress(id: number) {
  return compose(
    getTaskByIdProgressInner(id),
    (state: Observable<AppState>) => state.select(s => s.loadTaskByIdProgress));
}

export function getTaskById(id: number) {
  return (state: Observable<AppState>) => state
    .select(s => s.tasks.find(t => t.id === id));
}

const task = (state: Task, action): Task => {

  if (success(loadTaskById).type === action.type) {
    const t: Task = action.payload;
    if (t.id === state.id) {
      return t;
    }
  }

  if (changeTaskStatus.type === action.type) {
    const t: Task = action.payload;
    if (t.id === state.id) {
      return Object.assign(
        {},
        state,
        { status: t.status });
    }
  }

  return state;
};

const loadTaskByIdProgress = (state = {}, action) => {
  if (loadTaskById.type === action.type) {
    return Object.assign({}, state, {
      [action.payload.id]: true
    });
  }

  if (action.type === success(loadTaskById).type
    || action.type === error(loadTaskById).type) {
    const parentAction = action.meta;
    return Object.assign({}, state, {
      [parentAction.payload.id]: undefined
    });
  }

  return state;
};

const tasks = (state = [], action) => {
  if (success(loadAllTasks).type === action.type) {
    return action.payload;
  }

  if (success(loadTaskById).type === action.type
    || changeTaskStatus.type === action.type) {
    const { id } = action.payload;
    return state.map(t => t.id === id ? task(t, action) : t);
  }

  return state;
};

// export default combineReducers({ tasks });

export default compose(
  storeLogger({
    collapsed: true
  })
)(combineReducers({
  tasks,
  loadTaskByIdProgress: loadTaskByIdProgress
}));


