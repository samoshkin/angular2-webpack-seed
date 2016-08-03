/// <reference path="../node_modules/@types/reflect-metadata/reflect-metadata.d.ts" />

import 'core-js/es6';
import 'core-js/es7/reflect';

import 'zone.js/dist/zone';
import 'ts-helpers';

if (!process.env.RELEASE) {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
