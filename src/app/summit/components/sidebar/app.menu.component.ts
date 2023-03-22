import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {MenuDirectory} from '../menuItem/directory.const';
import directoryUserSettings from '../menuItem/directory.user.settings';
import { DialogService } from "primeng/dynamicdialog";

import { Router } from '@angular/router';
import { IMenuDirectory, IMenuItem } from '../menuItem/directory.interface';

import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/store/auth/auth.state';
import { LayoutComponent } from '../layout/layout.component';


@Component({
  selector: 'app-menu',
  styleUrls: ['./app.menu.component.scss'],
  templateUrl: './app.menu.component.html',
  providers: [DialogService]
})
export class AppMenuComponent {
  openedDirectory: IMenuDirectory;
  directory: IMenuDirectory[] = [];
  userMenus: IMenuItem[] = [];
  @Input() menuActiveMobile = false;
  @Input() item: any;
  @Input() index: any;
  @Input() root: any;

  @Select(AuthState.getUser) user$: Observable<any> | undefined;

  constructor(public appMain: LayoutComponent, private dialogService: DialogService, private router: Router, private zone: NgZone) {
    this.userMenus = [
      {
        label: 'menu.buttons.help',
        icon: 'pi pi-info-circle',
        action: () => {
          this.zone.run(() => router.navigate(['/help']));
        },
        active: false,
      },
      {
        label: 'menu.buttons.language',
        icon: 'pi pi-globe',
        action: () => {
          return this.openLanguageModal();
        },
        active: false,
      },
      {
        label: 'menu.buttons.darkmode',
        icon: 'pi pi-sun',
        action: function () {
          return AppMenuComponent.handleDarkMode();
        },
        active: false,
      }
    ];
    this.directory = MenuDirectory;
    this.openedDirectory = this.directory[0];
    this.directory[0].active = true;
    this.openDirectoryByRoute();

    const dark = localStorage.getItem('dark');
    if (dark && dark === "true"){
        localStorage.setItem('dark', 'true');
        document.body.classList.add('dark');
    }
  }

  openDirectoryByRoute() {
    const url = window.location.pathname;
    const urlArray = url.split('/');
    const urlDirectory = urlArray[1];
    if (urlDirectory) {
      this.directory.forEach((element) => {
        if (element.baseLink === urlDirectory) {
          this.openDirectory(element);
        }
      });
    }
    if (urlDirectory === "user") {
      this.openSettings();
    }
  }

  isActive(item: any) {
    return true;
  }

  openDirectory(item: any) {
    this.directory.forEach((element) => {
      element.active = false;
    });
    item.active = true;
    this.openedDirectory = item;
    console.log(item);
    // Utile ?
    // this.router.navigate(item.childrens[0].items[0].routerLink);
  }

  openSettings() {
    this.openDirectory({childrens: directoryUserSettings});
  }

  onKeydown(event: KeyboardEvent) {
    const nodeElement = <HTMLDivElement>event.target;
    if (event.code === 'Enter' || event.code === 'Space') {
      nodeElement.click();
    }
  }

  private static handleDarkMode() {
    const dark = localStorage.getItem('dark');
    if (!dark) {
      localStorage.setItem('dark', 'true');
      document.body.classList.add('dark');
    } else if (dark === 'true') {
      localStorage.setItem('dark', 'false');
      document.body.classList.remove('dark');
    } else {
      localStorage.setItem('dark', 'true');
      document.body.classList.add('dark');
    }

  }

  private openLanguageModal() {
  }
}
