import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EToastSeverity, ToastService } from './shared/services/toast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    toastSubscriber: Subscription | undefined;
    
    constructor(private primengConfig: PrimeNGConfig,
        private toastService: ToastService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
        ) {
            console.log('toastService');
            
        }
        
        ngOnInit() {
        this.primengConfig.ripple = true;
        this.toastSubscriber = this.toastService.toast$.subscribe(toast => {
            if (!toast) return;
            console.log('toast', toast);
            const life = toast.severity === EToastSeverity.error ? 4500 : 2500;
            this.messageService.add({ severity: toast.severity, summary: toast.title, detail: toast.message, life: life, closable: true });
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.toastSubscriber!.unsubscribe();
    }

}
