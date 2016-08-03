import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { runEffects } from '@ngrx/effects';
import { provideActionHandlers } from '../framework/ngrx-actions';

import { default as routes } from './routes';
import { default as rootReducer } from './reducers';
import { TaskEffects } from './effects';

export const provider = () => [
  provideRouter(routes),
  provideStore(rootReducer),
  runEffects(TaskEffects),
  provideActionHandlers(TaskEffects)
];
