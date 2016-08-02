import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { PLATFORM_DIRECTIVES } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import AppComponent from './app/app.component';
import { provider as appProvider } from './app';

import './styles/main.scss';

import { MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS } from './material2';

if (process.env.RELEASE) {
  enableProdMode();
}

function main(initialHMRState?) {
  return bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ...MATERIAL_PROVIDERS,
    { provide: PLATFORM_DIRECTIVES, multi: true, useValue: MATERIAL_DIRECTIVES },
    { provide: PLATFORM_DIRECTIVES, multi: true, useValue: [ROUTER_DIRECTIVES] },
    disableDeprecatedForms(),
    provideForms(),
    appProvider()
  ]).catch(err => console.error(err));
}

if (process.env.DEV_SERVER) {
  const hmr = require('angular2-hmr');
  hmr.hotModuleReplacement(main, module);
} else {
  document.addEventListener('DOMContentLoaded', () => main());
}
