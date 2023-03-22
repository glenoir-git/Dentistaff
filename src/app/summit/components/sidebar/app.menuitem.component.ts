import {
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {Observable, Subject, Subscription, takeUntil} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Select, Store} from '@ngxs/store';
import {ConfirmationService} from 'primeng/api';
import { AuthState } from 'src/app/store/auth/auth.state';
import { MenuService } from '../../services';
import { LayoutComponent } from '../layout/layout.component';


@Component({
  /* tslint:disable:component-selector */
  selector: '[app-menuitem]',
  /* tslint:enable:component-selector */
  templateUrl: './app.menuitem.component.html',
  host: {
    '[class.active-menuitem]': 'active',
  },
  animations: [
    trigger('children', [
      state(
        'void',
        style({
          height: '0px',
        })
      ),
      state(
        'hiddenAnimated',
        style({
          height: '0px',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
        })
      ),
      transition(
        'visibleAnimated => hiddenAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hiddenAnimated => visibleAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'void => visibleAnimated, visibleAnimated => void',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class AppMenuitemComponent implements OnInit, OnDestroy {
  @Input() item: any;

  @Input() index: number = 0;

  @Input() root: boolean = false;

  @Input() parentKey: string = '';

  active = false;

  menuSourceSubscription: Subscription;

  menuResetSubscription: Subscription;

  key: string = '';
  @Select(AuthState.getUser) user$: Observable<any> | undefined;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public show: boolean = true;

  constructor(
    public app: LayoutComponent,
    public router: Router,
    private cd: ChangeDetectorRef,
    private menuService: MenuService,
    private store: Store,
    private confirmationService: ConfirmationService,
    private zone: NgZone,
  ) {
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe(
      (key) => {
        // deactivate current active menu
        if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
          this.active = false;
        }
      }
    );

    this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
      this.active = false;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((params) => {
        if (this.item.routerLink) {
          this.updateActiveStateFromRoute();
        } else {
          this.active = false;
        }
      });
  }

  ngOnInit() {

    if (this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }

    this.key = this.parentKey
      ? this.parentKey + '-' + this.index
      : String(this.index);
  }

  updateActiveStateFromRoute() {
    this.active = this.router.isActive(
      this.item.routerLink[0],
      this.item.items ? false : true
    );
  }

  itemClick(event: Event) {
    // event.stopPropagation();
    // if (this.item?.routerLink) {
    //   this.router.navigate(this.item.routerLink, {replaceUrl: true});
    // }

    // avoid processing disabled items
    if (this.item.disabled) {
      return;
    }

    // notify other items
    this.menuService.onMenuStateChange(this.key);
    // execute command
    if (this.item.command) {
      this.item.command(this, {originalEvent: event, item: this.item});
    }

    // toggle active state
    if (this.item.items) {
      this.active = !this.active;
    } else {
      // activate item
      this.active = true;

      // hide overlay menus
      this.app.menuActiveMobile = false;

      if (this.app.isDesktop() && this.app.isOverlay()) {
        this.app.menuInactiveDesktop = true;
      }
    }
  }

  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }

    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // checkPrivateSale(item: any) {
  //   if (item.label === 'menu.ico.privateSale') {
  //     return this.user?.privateSale;
  //   }
  //   return true;
  // }
}
