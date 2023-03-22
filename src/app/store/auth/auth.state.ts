import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AdminService } from 'src/app/services/admin.service';
import { EToastSeverity, ToastService } from 'src/app/shared/services/toast.service';
import { User } from '../../entity/user';
import { AuthService } from '../../services/auth.service';
import { Login, Logout, Register, SetUser } from './auth.actions';

export interface AuthStateModel {
  logged: boolean;
  token: string | null;
  user: any | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    logged: false,
    token: null,
    user: null
  }
})
@Injectable()
export class AuthState {

  constructor(private authService: AuthService, private admService: AdminService, private router: Router, public afAuth: AngularFireAuth, private toastService: ToastService) { }

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }
  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  static logged(state: AuthStateModel) {
    return state.logged;
  }

  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    this.init(ctx);
  }

  @Action(Login)
  async login(ctx: StateContext<AuthStateModel>, { payload }: Login) {
    // logique de connexion ici (exemple : appel API)
    console.log('login', payload);
    try {
      const result = await this.authService.SignIn(payload.email, payload.password);
      if (result) {
        const userFire = await this.authService.getAuthUser();
        if (!userFire) return;
        const isAdmin = await this.admService.isAdmin(userFire!.uid).toPromise();
        if (!isAdmin.exists) {
          this.toastService.addToast(EToastSeverity.error, 'Erreur', 'Vous n\'êtes pas autorisé à vous connecter');
          this.authService.SignOut();
          localStorage.removeItem('user');
          ctx.patchState({ logged: false, user: null });
          this.router.navigate(['/auth']);
          return;
        }
        const authUser = {
          uid: userFire.uid,
          email: userFire.email,
          displayName: userFire.displayName,
          photoURL: userFire.photoURL,
          emailVerified: userFire.emailVerified,
          refreshToken: userFire.refreshToken
        };
        this.toastService.addToast(EToastSeverity.success, 'Succès', 'Vous êtes connecté');
        localStorage.setItem('user', JSON.stringify(authUser));
        ctx.patchState({ logged: true, user: authUser });
        this.router.navigate(['/group']);
      }
    } catch (error) {
      console.log('error', error);
      this.toastService.addToast(EToastSeverity.error, 'Erreur', "Compte introuvable");
      ctx.patchState({ logged: false, user: null });
      return;
    }
  }

  @Action(Register)
  async register(ctx: StateContext<AuthStateModel>, { payload }: Register) {
    // logique d'enregistrement ici (exemple : appel API)

  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    // logique de déconnexion ici (exemple : appel API)
    this.authService.SignOut();
    localStorage.removeItem('user');
    ctx.patchState({ logged: false, user: null });
    this.router.navigate(['/auth']);
  }

  @Action(SetUser)
  setUser(ctx: StateContext<AuthStateModel>, action: SetUser) {
    ctx.patchState({ user: action.user });
  }

  async init(ctx: StateContext<AuthStateModel>) {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      ctx.patchState({ logged: true, user: user });
    }
    this.afAuth.onAuthStateChanged(async user => {
      const isAdmin = await this.admService.isAdmin(user!.uid).toPromise();
      console.log('isAdmin', isAdmin);
      if (!isAdmin.exists) {
        console.log('not admin');
        this.toastService.addToast(EToastSeverity.error, 'Erreur', 'Vous n\'êtes pas autorisé à vous connecter');
        this.authService.SignOut();
        localStorage.removeItem('user');
        ctx.patchState({ logged: false, user: null });
        this.router.navigate(['/auth']);
        return;
      }
      if (user) {
        const authUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          refreshToken: user.refreshToken
        };
        localStorage.setItem('user', JSON.stringify(authUser));
        ctx.patchState({ logged: true, user: authUser });
      } else {
        localStorage.removeItem('user');
        ctx.patchState({ logged: false, user: null });
      }
    });
  }

}
