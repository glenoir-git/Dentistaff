import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NoAuthGuard } from './shared/guards/unlogged.guard';
import { AuthGuard } from './shared/guards/logged.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'auth', canActivate: [NoAuthGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
            { path: '', canActivate: [AuthGuard] , loadChildren: () => import('./summit/summit.module').then(m => m.SummitModule) },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
