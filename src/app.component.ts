import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HmrState } from 'angular2-hmr';
import { AppState } from './app.service.ts';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
    <div class="application" (click)="onClicked($event)">
      Hello, {{ state.counter }}, {{ appState.get('value') }}
    </div>
  `
})
export default class AppComponent implements OnInit {
  @HmrState() state = {
    counter: 1
  };

  constructor(public appState: AppState) {
  }

  onClicked() {
    console.log('onclicked');

    // FIXME: AngularClass/angular2-hmr/blob/111712e98ec4fdcc2c169ba3c9fd6aaceb03ed44/src/hmr-decorator.ts#L43
    // there is bug in angular2-hmr
    this.state.counter = this.state.counter + 1;
    this.appState.set('value', this.state.counter);
  }

  ngOnInit() {
    console.log('Application is initialized');
  }
}
