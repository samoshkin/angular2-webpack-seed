import { createAction } from '../framework/ngrx-actions';

export const loadAllTasks = createAction('task/loadAll');
export const loadTaskById = createAction('task/loadTaskById');
export const changeTaskStatus = createAction('task/changeStatus');
