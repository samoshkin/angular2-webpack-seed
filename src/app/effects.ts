import { Injectable } from '@angular/core';
import { StateUpdates, Effect, toPayload } from '@ngrx/effects';
import { AppState } from './reducers';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/observable/fromPromise';
import { loadAllTasks } from './actions';
import { success, error } from './action-helpers';

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


@Injectable()
export class TaskEffects {

  @Effect()
  loadTasksOnInit$ = Observable.of(loadAllTasks());

  @Effect()
  loadTasks$ = this.updates$
    .whenAction(loadAllTasks.type)
    .map(toPayload)
    .switchMap(query => Observable.fromPromise(this.loadAllTasks(query))
        .map(success(loadAllTasks))
        .catch(err => Observable.of(error(loadAllTasks)(err))));

  constructor(private updates$: StateUpdates<AppState>) { }

  async loadAllTasks(query) {
    // async task
    await new Promise(res => setTimeout(res, 1000));

    return tasksData;
  }
}

