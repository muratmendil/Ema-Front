import { Component, OnInit, Input } from '@angular/core';
import { Objectif } from '@app/calendar/models/objectif';
import { User } from '@app/calendar/models/user';
import { AuthService } from '@app/calendar/services/authService';
import { CalendarServices } from '@app/calendar/services/calendarServices';
import { EventUserDataService } from '@app/calendar/services/eventUserDataService';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.scss']
})
export class HomeSidebarComponent implements OnInit {

  objectifs: Array<Objectif>;
  user: User = new User();
  showNoObjectif = new BehaviorSubject(true);

  text = '';
  constructor(private authService: AuthService, private calendarService: CalendarServices, private eventUserService: EventUserDataService) { }

  ngOnInit() {
    this.user = this.authService.getUser();

    this.calendarService.getObjectifs(this.user.id).subscribe((res: Objectif[]) => {
      if(res.length > 0){
        this.showNoObjectif.next(false);
      } else {
        this.text = 'Pas dobjectif';
      }
      this.objectifs = res;
    });
  }

  ngAfterViewInit(): void {

  }

}
