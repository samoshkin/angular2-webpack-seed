import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'things',
  template: `
    <div>Things component</div>
    <router-outlet></router-outlet>
  `
})
export default class ThingsComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
