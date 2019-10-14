import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '@app/calendar/models/task';
import { User } from '@app/calendar/models/user';
import { Objectif } from '@app/calendar/models/objectif';
import { NewTaskComponent } from '../new-task/new-task.component';
import { MatDialog, MatDrawer } from '@angular/material';
import { Router } from '@angular/router';
import { CalendarComponent } from 'ng-fullcalendar';
import { CalendarServices } from '@app/calendar/services/calendarServices';
import { AuthService } from '@app/calendar/services/authService';
import { EventUserDataService } from '@app/calendar/services/eventUserDataService';
import { SideNavService } from '@app/calendar/services/sidenavService';
import { SnackBarService } from '@app/shared/service/snackBarService';
import { OptionsInput } from 'fullcalendar';

@Component({
  selector: 'app-home-calendar',
  templateUrl: './home-calendar.component.html',
  styleUrls: ['./home-calendar.component.scss']
})
export class HomeCalendarComponent implements OnInit {

  calendarOptions: OptionsInput;
  data: any;
  user: User = new User();
  tasks: Array<Task> = new Array();
  objectifs$: BehaviorSubject<Array<Objectif>> = new BehaviorSubject(Array<Objectif>());

  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('ucCalendar') ucCalendar: CalendarComponent;
  constructor(private authService: AuthService, private calendarService: 
    CalendarServices, public dialog: MatDialog, private router: Router, private eventUserDataService: EventUserDataService, 
    private sideNavService: SideNavService,
    private snackBarService : SnackBarService) { }

  ngOnInit() {
    this.eventUserDataService.getObjectifs().subscribe(res => {
      this.objectifs$.next(res);
    });
    this.sideNavService.actionSideNav.subscribe((res) => {
      this.drawer.toggle();
    });
    this.user = this.authService.getUser();
    this.calendarService.getObjectifs(this.user.id).subscribe((res : any) => {
      console.log("objectif");
      console.log(res);

      const tasksList : Array<Task> = new Array<Task>();
      res.forEach((obj : Objectif) => {
        obj.tasks.forEach((task : Task) => {
          tasksList.push(task);
        })
      })

      this.objectifs$.next(res);
      this.eventUserDataService.setObjectifs(res);
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        selectable: true,
        height: window.innerHeight - 105,
        droppable: true, // this allows things to be dropped onto the calendar
        locale: 'fr',
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: tasksList,
      };
    });
  }

  updateEvent(event: any) {
    console.log("1");

    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '40%',
      data: { event: event.detail, objectifs: this.objectifs$.pipe() }
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      if (result && result.refresh) {
        console.log('The dialog was closed');
      }
    });
  }

  select(event: any) {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '40%',
      data: { type: 'select', event: event, objectifs: this.objectifs$.pipe() , user : this.user}
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      if (result && result.refresh) {
        console.log('The dialog was closed');
        this.calendarService.getObjectifs(this.user.id).subscribe((res : any) => {
          const tasksList : Array<Task> = new Array<Task>();
          res.forEach((obj : Objectif) => {
            obj.tasks.forEach((task : Task) => {
              tasksList.push(task);
            })
          })
          this.ucCalendar.renderEvents(tasksList);
          this.snackBarService.openSnackBar("La tache à été créer", "");
        });
      }
    });
  }

  eventClick(event: any) {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '40%',
      data: { type: 'event-click', event: event.event, objectifs: this.objectifs$.pipe(), title: event.event.title, place: event.event.place , user : this.user}
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      if (result && result.refresh) {


        this.calendarService.getObjectifs(this.user.id).subscribe((res : any) => {
          const tasksList : Array<Task> = new Array<Task>();
          res.forEach((obj : Objectif) => {
            obj.tasks.forEach((task : Task) => {
              tasksList.push(task);
            })
          })
          this.ucCalendar.renderEvents(tasksList);
          if(result.type == "update"){
            this.snackBarService.openSnackBar("La tache à été modifié", "");
          } 
          else {
            this.snackBarService.openSnackBar("La tache à été supprimé", "");
          }
        });
      } 
    });
  }



  filterEvent() {
    this.calendarOptions.events = '';
  }


  eventRender(event: any, element : any, view : any) {
    console.log(event);
    event.element.css({
      'background-color': event.event.objectifColor,
      'border-color': event.event.objectifColor
    });
  }

}