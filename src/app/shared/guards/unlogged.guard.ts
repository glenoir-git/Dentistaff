import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../store/auth/auth.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  @Select(AuthState.logged)
    logged$!: Observable<boolean>;

  constructor(private store: Store, private router: Router) { }

  canActivate(): Observable<boolean> {
    console.log('AuthGuard');
    return this.logged$.pipe(
      map(logged => {
        if (logged) {
          this.router.navigate(['group']);
          return false;
        }
        return true;
      })
    );
  }

}
