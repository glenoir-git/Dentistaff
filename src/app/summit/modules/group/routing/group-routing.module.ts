import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from '../components';
import { CreateActivityComponent } from '../components/activity/create/create.component';
import { ActivityListComponent } from '../components/activity/list/list.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: `dashboard`,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {}
  },
  {
    path: 'activity/:id',
    component: CreateActivityComponent
  },
  {
    path: 'activity',
    component: ActivityListComponent
  },
  {
    path: "**",
    redirectTo: `dashboard`,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule {
}
