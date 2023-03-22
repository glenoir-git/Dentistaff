import {Component} from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(public appMain: LayoutComponent) {
  }

}
