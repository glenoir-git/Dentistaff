import {NgModule} from '@angular/core';
import {SummitRoutingModule} from "./routing/summit-routing.module";
import {SERVICES} from "./services";
import {COMPONENTS} from "./components";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [...COMPONENTS],
    imports: [
        SummitRoutingModule,
        SharedModule,
        ConfirmDialogModule
    ],
  providers: [...SERVICES],
  bootstrap: []
})
export class SummitModule {
}
