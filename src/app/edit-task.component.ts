import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div>Edit task component</div>
    <div>{{ route.params | async | json }}</div>
  `
})
export default class EditTaskComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }
}
