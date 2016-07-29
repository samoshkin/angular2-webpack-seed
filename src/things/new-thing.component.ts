import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-thing',
  template: `
    <div>New thing component</div>
  `
})
export default class NewThingComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
