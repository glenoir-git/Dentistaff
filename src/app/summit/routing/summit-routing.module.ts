import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "../components/layout/layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/group',
    pathMatch: 'full',
  },
  {
    path: 'group',
    component: LayoutComponent,
    loadChildren: () => import('./../modules/group/group.module').then(m => m.GroupModule),
    data: {preload: true},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummitRoutingModule {
}
