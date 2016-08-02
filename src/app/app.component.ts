import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AppState, TaskStatus } from './reducers';
import { loadAllTasks, changeTaskStatus } from './actions';

@Component({
  selector: 'app',
  styles: [
    require('./app.scss')
  ],
  template: `
    <header>
      This is header, from app.component.ts
    </header>
    <nav>
      <a
        routerLink="/tasks"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">Crisis Center</a>
      <a href="#" (click)="navigateToThing(1, $event);">Go to Thing 1</a>
      <a href="#" (click)="navigateToThing(2, $event);">Go to Thing 2</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export default class AppComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {
  }

  ngOnInit() {
    console.log('Application is initialized');

  }

  onClicked() {
    // console.log('onclicked');

    // FIXME: AngularClass/angular2-hmr/blob/111712e98ec4fdcc2c169ba3c9fd6aaceb03ed44/src/hmr-decorator.ts#L43
    // there is bug in angular2-hmr
    // this.state.counter = this.state.counter + 1;
    // this.appState.set('value', this.state.counter);
  }

  navigateToThing(id, evt) {
    evt.preventDefault();

    this.router.navigate(['/tasks', id]);
  }
}

/*
 COMPONENTS:
 App (root) / -> redirect to /bag/:bagId/things/:{firstId} or /new
 Header
   StatisticsComponent
 Menu
 ThingsListComponent  /bag/:bagId/things
   ThingComponent
   ThingsActionBar
 NewThingForm     /bag/:bagId/things/:thingId
 EditThingForm    /bag/:bagId/things/new
*/

/*
 ROUTES:
 / -> redirect to bag/things/
/bag/things -> redirect to /bag/things/:{firstId}
/bag/things/new
/bag/things/{:id}
*/

/*
Data Model:
bag: {
  things: [],
}

thing: {
  name,
  status,
  category,
  notes,
  optional
  tags: []
}
*/


/*
Actions:
loadThings()
addThing()
editThing()
changeStatus()
removeThing()
*/

