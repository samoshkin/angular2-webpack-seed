import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, Task } from './reducers';
import { loadTaskById } from './actions';
import { ISubscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  template: `
    <style>
      .isInProgress {
        color: red
      }
    </style>
    <div [class.isInProgress]="isInProgress | async">Edit task component</div>
    <div>Route params: {{ route.params | async | json }}</div>
    <div>Task: {{ task | async | json }}</div>
  `
})
export default class EditTaskComponent implements OnInit, OnDestroy {
  paramsSub: ISubscription;
  isInProgress: Observable<boolean>;
  task: Observable<Task>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => loadTaskById({ id: Number(params['id']) }))
      .subscribe(this.store);

    // this.isInProgress = this.route.params
    //   .switchMap(params => this.store.let(getTaskByIdProgress(Number(params['id']))));

    // this.task = this.route.params
    //   .switchMap(params => this.store.let(getTaskById(Number(params['id']))));
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
