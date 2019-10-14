import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { CalendarComponent } from './calendar.component';
import { ProfilComponent } from './components/profil/profil.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeCalendarComponent } from './components/home-calendar/home-calendar.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from 'ng-fullcalendar';
import { CalendarServices } from '@app/calendar/services/calendarServices';
import { EventUserDataService } from '@app/calendar/services/eventUserDataService';
import { HomeSidebarComponent } from './components/home-sidebar/home-sidebar.component';
import { ObjectifsComponent } from './components/objectifs/objectifs.component';
import { NewObjectifComponent } from './components/new-objectif/new-objectif.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { DetailsObjectifComponent } from './components/details-objectif/details-objectif.component';
import { ForumComponent } from './components/forum/forum.component';
import { ObjectifsSidebarComponent } from './components/objectifs-sidebar/objectifs-sidebar.component';
import { PostService } from './services/postService';
import { SideNavService } from './services/sidenavService';
import { AuthenticatedGuard } from './guard/AuthenticatedGuard';
import { NewPostComponent } from './components/new-post/new-post.component';
import { HttpService } from '@app/core';
import { NoteTaskComponent } from './components/note-task/note-task.component';
import { UpdateObjectifComponent } from './components/update-objectif/update-objectif.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    CalendarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    ChartsModule,
    ColorPickerModule,
  ],
  declarations: [
    ProfilComponent,
    HeaderComponent,
    HomeCalendarComponent,
    CalendarComponent,
    NewTaskComponent,
    HomeSidebarComponent,
    ObjectifsComponent,
    NewObjectifComponent,
    NewPostComponent,
    DetailsObjectifComponent,
    ObjectifsSidebarComponent,
    ForumComponent,
    NoteTaskComponent,
    UpdateObjectifComponent,
    DeleteDialogComponent,
  ],
  providers: [CalendarServices, EventUserDataService, PostService, SideNavService, AuthenticatedGuard, HttpService],
  entryComponents : [NewTaskComponent, NoteTaskComponent, NewPostComponent,  UpdateObjectifComponent, DeleteDialogComponent]
})
export class CalendarModule { }
