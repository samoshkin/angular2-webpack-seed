import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'not-found',
  template: `
    <div>Not found component</div>
  `
})
export default class NotFoundComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
