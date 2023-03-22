import {NgModule} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { COMPONENTS } from './components';
import { CreateActivityComponent } from './components/activity/create/create.component';
import { ActivityListComponent } from './components/activity/list/list.component';
import { GroupRoutingModule } from './routing/group-routing.module';
import { SERVICES } from './services';




@NgModule({
  declarations: [
    ...COMPONENTS,
    CreateActivityComponent,
    ActivityListComponent
  ],
  imports: [
    GroupRoutingModule,
    SharedModule
  ],
  providers: [...SERVICES],
  bootstrap: []
})
export class GroupModule {
}
