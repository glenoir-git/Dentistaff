import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [],
  animations: [
    trigger('submenu', [
      state(
        'hidden',
        style({
          height: '0px',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      transition(
        'visible => hidden',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hidden => visible',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class LayoutComponent implements OnInit {
  menuMode = 'static';
  config = {
    dark: false,
    inputStyle: 'outlined',
    ripple: true,
    theme: 'lara-light-blue',
  };
  public menuInactiveDesktop: boolean = false;
  public menuActiveMobile: boolean = false;
  public overlayMenuActive: boolean = false;
  public staticMenuInactive: boolean = false;
  public profileActive: boolean = true;
  public topMenuActive: boolean = true;
  public topMenuLeaving: boolean = true;
  public theme: string = "lara-light-blue";
  documentClickListener: any = null;
  documentSwipeListener: any = null;
  documentSwipeMoveListener: any = null;
  menuClick: boolean = false;
  topMenuButtonClick: boolean = false;
  configActive: boolean = false;
  configClick: boolean = false;
  xDown = null;                                                        
  yDown = null;

  constructor(public renderer: Renderer2,private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    document.documentElement.style.fontSize = '16px';
  }

  handleTouchMove(evt:any) {
    if ( !this.xDown || ! this.yDown ) {
        return;
    }
    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;
    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;                                                        
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff < 0 && Math.abs(xDiff) > 5 ) {
            this.toggleMenu(evt);

        } else if (Math.abs(xDiff) > 5) {
            this.toggleMenu(evt);
        }                       
    }
    this.xDown = null;
    this.yDown = null;                                             
}

  handleTouchStart(evt:any) {
    const firstTouch = (evt.touches || evt.originalEvent.touches)[0];                                      
    this.xDown = firstTouch.clientX;                                      
    this.yDown = firstTouch.clientY;                                      
  } 

  ngAfterViewInit() {
    //document.addEventListener('touchstart', this.handleTouchStart, false);        
    //document.addEventListener('touchmove', this.handleTouchMove, false);
    this.documentClickListener = this.renderer.listen(
      'body',
      'click',
      (event) => {
        if (event.clientX < 300) {
          return;
        }
        this.menuActiveMobile = false;
        if (!this.isDesktop()) {
          if (!this.menuClick) {
            this.menuActiveMobile = false;
          }

          if (!this.topMenuButtonClick) {
            this.hideTopMenu();
          }
        } else {
          if (!this.menuClick && this.isOverlay()) {
            this.menuInactiveDesktop = true;
          }
          if (!this.menuClick) {
            this.overlayMenuActive = false;
          }
        }

        if (this.configActive && !this.configClick) {
          this.configActive = false;
        }

        this.configClick = false;
        this.menuClick = false;
        this.topMenuButtonClick = false;
      }
    );
  }

  toggleMenu(event: Event) {
    this.menuClick = true;
    if (this.isDesktop()) {
      if (this.menuMode === 'overlay') {
        if (this.menuActiveMobile === true) {
          this.overlayMenuActive = true;
        }
        this.overlayMenuActive = !this.overlayMenuActive;
        this.menuActiveMobile = false;
      } else if (this.menuMode === 'static') {
        this.staticMenuInactive = !this.staticMenuInactive;
      }
    } else {
      this.menuActiveMobile = !this.menuActiveMobile;
      this.topMenuActive = false;
    }

    event.preventDefault();
  }

  toggleProfile(event: Event) {
    this.profileActive = !this.profileActive;
    event.preventDefault();
  }

  toggleTopMenu(event: Event) {
    this.topMenuButtonClick = true;
    this.menuActiveMobile = false;

    if (this.topMenuActive) {
      this.hideTopMenu();
    } else {
      this.topMenuActive = true;
    }

    event.preventDefault();
  }

  hideTopMenu() {
    this.topMenuLeaving = true;
    setTimeout(() => {
      this.topMenuActive = false;
      this.topMenuLeaving = false;
    }, 1);
  }

  onMenuClick() {
    this.menuClick = true;
  }

  isStatic() {
    return this.menuMode === 'static';
  }
  isOverlay() {
    return this.menuMode === 'overlay';
  }

  isDesktop() {
    return window.innerWidth > 992;
  }

  isMobile() {
    return window.innerWidth < 1024;
  }

  onSearchClick() {
    this.topMenuButtonClick = true;
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }
}
