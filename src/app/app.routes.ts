import { RouterConfig } from '@angular/router';
import WelcomeComponent from './welcome.component';
import NotFoundComponent from './not-found.component';

import { routes as thingsRoutes } from '../things';

const routes: RouterConfig = [
  { path: '', component: WelcomeComponent },
  ...thingsRoutes,
  { path: '**', component: NotFoundComponent }
];

export default routes;

