import { Component, OnInit } from '@angular/core';
import { Task } from '@app/calendar/models/task';
import { AuthService } from '@app/calendar/services/authService';
import { User } from '@app/calendar/models/user';
import { Objectif } from '@app/calendar/models/objectif';
import { CalendarServices } from '@app/calendar/services/calendarServices';
import { EventUserDataService } from '@app/calendar/services/eventUserDataService';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-objectifs-sidebar',
  templateUrl: './objectifs-sidebar.component.html',
  styleUrls: ['./objectifs-sidebar.component.css']
})
export class ObjectifsSidebarComponent implements OnInit {

  tasks : Array<Task> = new Array();
  user : User = new User();
  objectifs$: Observable<Array<any>>
  showNoObjectif = new BehaviorSubject(true);
  text = '';

  constructor(private authService : AuthService,  private calendarService : CalendarServices, private eventUserService : EventUserDataService) { }

  ngOnInit() {
    this.user = this.authService.getUser();

  }

  ngAfterViewInit(): void {
    this.objectifs$ = this.calendarService.getObjectifs(this.user.id).pipe().map((res : Objectif[]) => {
        if(res.length > 0){
          this.showNoObjectif.next(true);
        } else {
          this.text = 'Pas dobjectif';
        }
      return res;
    })
  }
  
  onFilterChange(objectif: Objectif){
   objectif.active = objectif.active ? false : true;
   console.log(objectif.active);
   this.tasks  = new Array();
   this.calendarService.filterEvent(this.tasks);
  }
}
