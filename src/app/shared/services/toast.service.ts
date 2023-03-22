import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export interface Toast {
  severity: string;
  title: string;
  message: string;
}

export enum EToastSeverity {
  success = 'success',
  info = 'info',
  warn = 'warn',
  error = 'error'
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private toast = new Subject<Toast | null>();

  toast$ = this.toast.asObservable();

  constructor() {
  }

  addToast(severity: EToastSeverity, title: string, body: any) {
    title = title;
    let message = '';
    if (body) {
      message = body?.message || body || '';
      message = message;
    }
    this.toast.next({severity, title, message});
    this.toast.next(null);
  }
}
