import { RouterConfig } from '@angular/router';
import WelcomeComponent from './welcome.component';
import NotFoundComponent from './not-found.component';
import TasksComponent from './tasks.component';
import NewTaskComponent from './new-task.component';
import EditTaskComponent from './edit-task.component';

const routes: RouterConfig = [
  { path: '', component: WelcomeComponent },
  {
    path: 'tasks',
    component: TasksComponent,
    children: [
      { path: '', redirectTo: 'new', pathMatch: 'full' },
      { path: 'new', component: NewTaskComponent },
      { path: ':id', component: EditTaskComponent },
    ],
  },
  { path: '**', component: NotFoundComponent }
];

export default routes;

