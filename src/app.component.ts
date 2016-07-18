import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
    <div>
      Application component
    </div>
  `
})
export default class AppComponent implements OnInit {
  ngOnInit() {
    console.log('Application is initialized');
  }
}
