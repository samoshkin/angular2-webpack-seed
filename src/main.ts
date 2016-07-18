import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import AppComponent from './app.component';

if (!process.env.DEBUG) {
  enableProdMode();
}

// bootstrap application
// bootstrap application
// bootstrap application
// bootstrap application
// bootstrap application
// bootstrap application
// bootstrap application
// bootstrap application
bootstrap(AppComponent, [
    HTTP_PROVIDERS,
  ])
  .catch(err => console.error(err));
