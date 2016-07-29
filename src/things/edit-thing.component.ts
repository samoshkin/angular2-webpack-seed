import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-thing',
  template: `
    <div>Edit thing component1</div>
    <div>{{ route.params | async | json }}</div>
    <div>From snapshot: {{ paramFromSnapshot | json }}</div>
  `
})
export default class EditThingComponent implements OnInit {
  paramFromSnapshot;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramFromSnapshot = this.route.snapshot.params;
  }
}
