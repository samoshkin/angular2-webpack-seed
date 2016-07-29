import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { PLATFORM_DIRECTIVES } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from './app';

import AppComponent from './app/app.component';
import { AppState } from './app/app.service';

import './styles/main.scss';

import { MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS } from './material2';

if (process.env.RELEASE) {
  enableProdMode();
}

function main(initialHMRState?) {
  return bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    AppState,
    ...MATERIAL_PROVIDERS,
    { provide: PLATFORM_DIRECTIVES, multi: true, useValue: MATERIAL_DIRECTIVES },
    { provide: PLATFORM_DIRECTIVES, multi: true, useValue: [ROUTER_DIRECTIVES] },
    provideRouter(routes),
    ROUTER_DIRECTIVES,
    disableDeprecatedForms(),
    provideForms()
  ]).catch(err => console.error(err));
}

if (process.env.DEV_SERVER) {
  const hmr = require('angular2-hmr');
  hmr.hotModuleReplacement(main, module);
} else {
  document.addEventListener('DOMContentLoaded', () => main());
}
