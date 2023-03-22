import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/logged.guard';
import { NoAuthGuard } from './guards/unlogged.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastService } from './services/toast.service';
import { MessageService } from 'primeng/api';
import {ListboxModule} from 'primeng/listbox';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ChipsModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule,
    TabViewModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    DynamicDialogModule,
    OverlayPanelModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    ImageModule,
    FileUploadModule,
    StepsModule,
    CalendarModule,
    DividerModule,
    TableModule,
    TagModule,
    ListboxModule,
    RadioButtonModule,
    SkeletonModule,
    AutoCompleteModule,
    RadioButtonModule,
    SelectButtonModule,
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
    ToastService,
    MessageService
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ChipsModule,
    ListboxModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule,
    TabViewModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    DynamicDialogModule,
    OverlayPanelModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    ImageModule,
    FileUploadModule,
    StepsModule,
    CalendarModule,
    DividerModule,
    TableModule,
    TagModule,
    RadioButtonModule,
    SkeletonModule,
    AutoCompleteModule,
    RadioButtonModule,
    SelectButtonModule,
  ]
})
export class SharedModule { }
