import { Injectable } from '@angular/core';
import { StateUpdates, Effect, toPayload } from '@ngrx/effects';
import { AppState } from './reducers';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/interval';
import { loadAllTasks, loadTaskById } from './actions';
import { success, error } from './action-helpers';
import { TaskStatus } from './reducers';

const tasksData = [
  {
    id: 1,
    name: 'Write code'
  },
  {
    id: 2,
    name: 'Compile'
  }
];

const handleAction = (action, handler) => stateUpdates$ =>
  stateUpdates$
    .whenAction(action.type)
    .mergeMap(updates => Observable.fromPromise(handler(updates.action, updates.state))
      .map(res => success(action)(res, updates.action))
      .catch(err => Observable.of(error(action)(err, updates.action))));

@Injectable()
export class TaskEffects {

  @Effect()
  loadTasksOnInit$ = Observable.of(loadAllTasks());

  @Effect()
  loadTasks$ = this.updates$.let(handleAction(
    loadAllTasks,
    async action => {
      // async task
      await new Promise(res => setTimeout(res, 1000));

      return tasksData;
    }));

  @Effect()
  loadTaskById$ = this.updates$.let(handleAction(
    loadTaskById,
    async (action, state) => {
      const { id } = action.payload;
      await Observable.interval(2000).take(1).toPromise();
      return {
        id,
        name: 'Debug it',
        status: TaskStatus.Progress
      };
    }));

  constructor(
    private updates$: StateUpdates<AppState>,
    private store: Store<AppState>) { }

}

