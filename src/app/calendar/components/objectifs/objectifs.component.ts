import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Objectif } from '@app/calendar/models/objectif';
import { SideNavService } from '@app/calendar/services/sidenavService';
import { MatDrawer, MatDialog } from '@angular/material';
import { CalendarServices } from '@app/calendar/services/calendarServices';
import { AuthService } from '@app/calendar/services/authService';
import * as moment from 'moment';
import { UpdateObjectifComponent } from '../update-objectif/update-objectif.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SnackBarService } from '@app/shared/service/snackBarService';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-objectifs',
  templateUrl: './objectifs.component.html',
  styleUrls: ['./objectifs.component.css']
})
export class ObjectifsComponent implements OnInit, AfterViewInit {

  objectifs$: Observable<Array<Objectif>>;
  showNoObjectif = true;

  @ViewChild('drawer') drawer: MatDrawer;
  constructor(private authService: AuthService, private router: Router, 
    private sideNavService: SideNavService,  
    private snackBarService : SnackBarService,
    private calendarService : CalendarServices, public dialog: MatDialog) { }

  ngOnInit() {
    this.sideNavService.actionSideNav.subscribe((res) => {
      this.drawer.toggle();
    });
  }

  ngAfterViewInit(): void {
    this.objectifs$ = this.calendarService.getObjectifs(this.authService.getUser().id).pipe().map((res : Array<Objectif>) => {
      if(res.length > 0){
        this.showNoObjectif = false;
      }
      return res;
    });
  }

  goToDetails(objectif: Objectif) {
    this.router.navigate(['calendar/objectif/' + objectif.id]);
  }

  getStarted(objectif : Objectif) : String {
    if(moment(objectif.start) <  moment() &&  moment() < moment(objectif.end)){
      return "running";
    }
    else if(moment(objectif.start) >  moment() && moment(objectif.start) < moment(objectif.end)){
      return "pending";
    }
    else {
      return "finish";
    }
  }

  updateObjectif(objectif : Objectif){
    const dialogRef = this.dialog.open(UpdateObjectifComponent, {
      width: '40%',
      data: { objectif: objectif}
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      if (result && result.canSave) {
        
        // Update Task
      }
    });
  }


   deleteObjectif(objectif : Objectif){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '40%',
      data: { message: 'Vous vous supprimer cet objectif?'}
    });

    dialogRef.afterClosed().subscribe((result : any)  =>  {
      if (result && result.next) {
        // Delete objectif

        objectif.tasks = [];
        this.calendarService.updateObjetif(objectif).pipe(switchMap((res => (
          this.calendarService.deleteObjectif(objectif)
        )))).subscribe(res => {
          this.snackBarService.openSnackBar("Lobjectif a été suprimé", "Delete");
        });
      }
    });
  }
}
