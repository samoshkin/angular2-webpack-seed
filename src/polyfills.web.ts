import 'core-js/es6';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'ts-helpers';

if (process.env) {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
