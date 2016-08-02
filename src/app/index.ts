import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { runEffects } from '@ngrx/effects';

import { default as routes } from './routes';
import { default as rootReducer } from './reducers';
import { TaskEffects } from './effects';

export const provider = () => [
  provideRouter(routes),
  provideStore(rootReducer),
  runEffects(TaskEffects)
];
