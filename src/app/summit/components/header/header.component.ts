import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs';
import {Logout} from 'src/app/store/auth/auth.actions';
import { AuthState } from 'src/app/store/auth/auth.state';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userPanel = false;
  items: MenuItem[] = [];
  @Select(AuthState.getUser) user$: Observable<any> | undefined;

  constructor(public appMain: LayoutComponent, private store: Store) {
  }

  async logout() {
    this.store.dispatch(new Logout());
  }

  displayUserPanel() {
    this.userPanel = !this.userPanel
      const body = document.getElementsByTagName('body')[0];
    if (this.userPanel) {
      body.classList.add('no-scroll');
    }else{
      body.classList.remove('no-scroll');

    }

  }
}
