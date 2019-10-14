import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Task } from '@app/calendar/models/task';
import { User } from '@app/calendar/models/user';
import { CalendarServices } from '@app/calendar/services/calendarServices';
import { AuthService } from '@app/calendar/services/authService';
import { SideNavService } from '@app/calendar/services/sidenavService';
import { MatDrawer, MatDialog } from '@angular/material';
import { Objectif } from '@app/calendar/models/objectif';
import * as moment from 'moment';
import { NoteTaskComponent } from '../note-task/note-task.component';
import { SnackBarService } from '@app/shared/service/snackBarService';
import { NewTaskComponent } from '../new-task/new-task.component';
import { RadialChartOptions, ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import *  as _ from 'lodash';

@Component({
  selector: 'app-details-objectif',
  templateUrl: './details-objectif.component.html',
  styleUrls: ['./details-objectif.component.css']
})
export class DetailsObjectifComponent implements OnInit {
  tasks$: Observable<Array<Task>>;
  user: User = new User();
  objectif : Objectif;
  @ViewChild('drawer') drawer: MatDrawer;
  public lineChartData: BehaviorSubject<ChartDataSets[]> = new BehaviorSubject<ChartDataSets[]>([{data : [], label : ''}]);
  showImage : BehaviorSubject<boolean> = new BehaviorSubject(true);
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    annotation : '',
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins : any = [];

  text1 = '';
  text2 = '';

  constructor(private authService : AuthService, 
    public dialog: MatDialog, 
    private calendarService : CalendarServices, 
    private route : ActivatedRoute, 
    private sideNavService : SideNavService,
    private snackBarService : SnackBarService) { 
      
    }

  ngOnInit() {

    this.sideNavService.actionSideNav.subscribe((res) => {
      this.drawer.toggle();
    });
    this.user = this.authService.getUser();
    const objectifId = this.route.snapshot.params['id'];
    this.tasks$ = this.calendarService.getObjectif(objectifId).pipe().map((res: Objectif) => {

      if(res.tasks.length > 0){
        this.showImage.next(false);
      } else {
        this.text1 = 'Pas de tache';
        this.text2 = 'Pas de graphique';
      }
      this.objectif = res;
      let data : any = [];
      let labels : any = [];
      res.tasks.forEach((task :Task)=> {
          data.push(task.successLevel);
          labels.push(task.title);
      });    
      this.lineChartData.next([{data : data, label : res.title}]);
      this.lineChartLabels = labels;
      return res.tasks;
    })

  }


  getStarted(task : Task) : String {
    if(task){
      if(moment(task.start) <  moment() &&  moment() < moment(task.end)){
        return "running";
      }
      else if(moment(task.start) >  moment() && moment(task.start) < moment(task.end)){
        return "pending";
      }
      else {
        return "finish";
      }
    }
  }

  isDesabled(task : Task) : boolean{
    if(task){
      if(moment() > moment(task.end)){
        return false
      }
      else {
        return true
      }
    }
  }


  updateTask(task : Task){
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '40%',
      data: { type: 'objectif-task-click', task: task, user : this.user}
    });
  }
  noteTask(task : Task){
    const dialogRef = this.dialog.open(NoteTaskComponent, {
      width: '40%',
      data: { task: task}
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      if (result && result.canSave) {
        this.calendarService.updateTask(result.task).subscribe((res : Task) => {
              if(res.title){
                this.snackBarService.openSnackBar("La tache à été noté", "Notation");
              }
        })
        // Update Task
      }
    });
  }


  deleteTask(task : Task){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '40%',
      data: { message: 'Vous vous supprimer la tache?'}
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      if (result && result.next) { 
        var index = _.findIndex(this.objectif.tasks, { id: task.id });
            // Replace item at index using native splice
            this.objectif.tasks.splice(index, 1);
            this.calendarService.updateObjetif(this.objectif).subscribe(res => {
              this.snackBarService.openSnackBar("La tache a été suprimé", "Delete");
            });      
        }
    });
  }
}
