import { RouterConfig } from '@angular/router';

import NewThingComponent from './new-thing.component';
import EditThingComponent from './edit-thing.component';
import ThingsComponent from './things.component';

const routes: RouterConfig = [{
  path: 'bag/things',
  component: ThingsComponent,
  children: [
    { path: '', redirectTo: 'new', pathMatch: 'full' },
    { path: 'new', component: NewThingComponent },
    { path: ':id', component: EditThingComponent },
  ]
}];

export default routes;

