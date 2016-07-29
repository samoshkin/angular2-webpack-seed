import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'welcome',
  template: `
    <div>Welcome component</div>
  `
})
export default class WelcomeComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
