import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ProfilComponent } from './components/profil/profil.component';
import { HomeCalendarComponent } from './components/home-calendar/home-calendar.component';
import { ObjectifsComponent } from './components/objectifs/objectifs.component';
import { NewObjectifComponent } from './components/new-objectif/new-objectif.component';
import { DetailsObjectifComponent } from './components/details-objectif/details-objectif.component';
import { ForumComponent } from './components/forum/forum.component';
import { AuthenticatedGuard } from './guard/AuthenticatedGuard';


const routes: Routes = [
  Shell.childRoutes([
    { path: 'calendar', component: CalendarComponent, canActivate : [AuthenticatedGuard], data: { title: extract('Calendar')},
    children : [
      { path: '', redirectTo : 'home' , pathMatch : 'full'},
      { path: 'home', component: HomeCalendarComponent, data: { title: extract('Calendar')}},
      { path: 'profil', component: ProfilComponent, data: { title: extract('Calendar')}},
      { path: 'forum', component: ForumComponent, data: { title: extract('Calendar')}},
      {path: 'objectif', component: ObjectifsComponent, data: { title: extract('Objectif')}},
      {path: 'objectif/:id', component: DetailsObjectifComponent, data: { title: extract('Calendar')}},
      {path: 'new-objectif', component: NewObjectifComponent, data: { title: extract('New-Objectif')}},
    ]
  }
  ])
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class CalendarRoutingModule { }
