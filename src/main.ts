import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import AppComponent from './app.component';
import { AppState } from './app.service';

if (process.env.RELEASE) {
  enableProdMode();
}

function main(initialHMRState?) {
  return bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    AppState
  ]).catch(err => console.error(err));
}

if (process.env.DEV_SERVER) {
  const hmr = require('angular2-hmr');
  hmr.hotModuleReplacement(main, module);
} else {
  document.addEventListener('DOMContentLoaded', () => main());
}
