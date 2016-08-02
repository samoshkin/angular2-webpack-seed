import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div>Tasks component</div>
    <router-outlet></router-outlet>
  `
})
export default class TasksComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
