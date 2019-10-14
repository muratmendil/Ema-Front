import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, DateAdapter, MAT_DATE_FORMATS, MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { AppDateAdapter, APP_DATE_FORMATS } from '@app/calendar/adapter/appDateAdapter';
import { Objectif } from '@app/calendar/models/objectif';
import { Task } from '@app/calendar/models/task';
import { CalendarServices } from '@app/calendar/services/calendarServices';
import * as _ from 'lodash';
import { User } from '@app/calendar/models/user';
import { SnackBarService } from '@app/shared/service/snackBarService';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class NewTaskComponent implements OnInit {
  myForm: FormGroup;
  times: Array<string> = new Array();
  startDate: any;
  endDate: any;
  startTime: any;
  endTime: any;
  type: string;
  task: Task;
  objectifs$: BehaviorSubject<Array<Objectif>> = new BehaviorSubject(Array<Objectif>());
  selectedObjectif: Objectif = null;
  user: User = new User();
  objectif = new Objectif();
  constructor(fb: FormBuilder, public dialogRef: MatDialogRef<NewTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private calendarService: CalendarServices,
    private snackBarService: SnackBarService) {
    this.type = data.type;
  
    this.objectifs$ = data.objectifs;
    if (data.type === 'event-click') {
      this.user = data.user;
      this.task = data.event;
      this.calendarService.getTask(this.user.id, this.task.id).subscribe(res => {
        this.task = res;
      });
      this.calendarService.getObjectif(this.task.objectifId).subscribe(res => {
        this.objectif = res;
      });
    }

    if (data.type === 'objectif-task-click') {
      this.user = data.user;
      this.task = data.task;
      this.calendarService.getTask(this.user.id, this.task.id).subscribe(res => {
        this.task = res;
      });
      this.calendarService.getObjectif(this.task.objectifId).subscribe(res => {
        this.objectif = res;
      });
    }
    this.setupTimePicker();

    if(data.type === 'event-click' || data.type === 'select'){
    this.startDate = moment(data.event.start._d).subtract({ hours: 2 }).format('YYYY-MM-DD HH:mm:ss');
      this.endDate = moment(data.event.end._d).subtract({ hours: 2 }).format('YYYY-MM-DD HH:mm:ss');
      this.startTime = moment(this.startDate).format('LT');
      this.endTime = moment(this.endDate).format('LT');

      this.myForm = fb.group({
        'startDate': [new Date(this.startDate), Validators.compose([Validators.required])],
        'endDate': [new Date(this.endDate), Validators.compose([Validators.required])],
        'startTime': [this.startTime, Validators.compose([Validators.required])],
        'endTime': [this.endTime, Validators.compose([Validators.required])],
        'title': [data.title, Validators.compose([Validators.required])],
        'place': [data.place, Validators.compose([Validators.required])],
        'objectif': [null, Validators.compose([Validators.required])],
      });
    } else {
      this.startDate = moment(data.task.start).subtract({ hours: 2 }).format('YYYY-MM-DD HH:mm:ss');
      this.endDate = moment(data.task.end).subtract({ hours: 2 }).format('YYYY-MM-DD HH:mm:ss');
      this.startTime = moment(this.startDate).format('LT');
      this.endTime = moment(this.endDate).format('LT');
      this.myForm = fb.group({
        'startDate': [new Date(this.startDate), Validators.compose([Validators.required])],
        'endDate': [new Date(this.endDate), Validators.compose([Validators.required])],
        'startTime': [this.startTime, Validators.compose([Validators.required])],
        'endTime': [this.endTime, Validators.compose([Validators.required])],
        'title': [data.task.title, Validators.compose([Validators.required])],
        'place': [data.task.place, Validators.compose([Validators.required])],
        'objectif': [null, Validators.compose([Validators.required])],
      });
    }
  
  }

  ngOnInit() {
  }


  setupTimePicker() {
    this.times.push('12:00 AM');
    this.times.push('12:30 AM');
    this.times.push('1:00 AM');
    this.times.push('1:30 AM');
    this.times.push('2:00 AM');
    this.times.push('2:30 AM');
    this.times.push('3:00 AM');
    this.times.push('3:30 AM');
    this.times.push('4:00 AM');
    this.times.push('4:30 AM');
    this.times.push('5:00 AM');
    this.times.push('5:30 AM');
    this.times.push('6:00 AM');
    this.times.push('6:30 AM');
    this.times.push('7:00 AM');
    this.times.push('7:30 AM');
    this.times.push('8:00 AM');
    this.times.push('8:30 AM');
    this.times.push('9:00 AM');
    this.times.push('9:30 AM');
    this.times.push('10:00 AM');
    this.times.push('10:30 AM');
    this.times.push('11:00 AM');
    this.times.push('11:30 AM');
    this.times.push('12:00 PM');
    this.times.push('12:30 PM');
    this.times.push('1:00 PM');
    this.times.push('1:30 PM');
    this.times.push('2:00 PM');
    this.times.push('2:30 PM');
    this.times.push('3:00 PM');
    this.times.push('3:30 PM');
    this.times.push('4:00 PM');
    this.times.push('4:30 PM');
    this.times.push('5:00 PM');
    this.times.push('5:30 PM');
    this.times.push('6:00 PM');
    this.times.push('6:30 PM');
    this.times.push('7:00 PM');
    this.times.push('7:30 PM');
    this.times.push('8:00 PM');
    this.times.push('8:30 PM');
    this.times.push('9:00 PM');
    this.times.push('9:30 PM');
    this.times.push('10:00 PM');
    this.times.push('10:30 PM');
    this.times.push('11:00 PM');
    this.times.push('11:30 PM');
  }

  createTask(form: any) {
    console.log(form);
    let startTime = moment(form.startTime, ["HH:mm A"]).format("HH:mm");
    let endTime = moment(form.endTime, ["HH:mm A"]).format("HH:mm");
    const splitStartTime = startTime.split(":");
    const splitEndTime = endTime.split(":");
    const startDate = moment(form.startDate).add({ hours: Number(splitStartTime[0]), minutes: Number(splitStartTime[1]) }).format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment(form.endDate).add({ hours: Number(splitEndTime[0]), minutes: Number(splitEndTime[1]) }).format('YYYY-MM-DD HH:mm:ss');

    if (moment(form.objectif.start) < moment(startDate) && moment(endDate) < moment(form.objectif.end)) {
      const task: Task = new Task();
      task.title = form.title;
      task.place = form.place;
      task.objectifId = form.objectif.id;
      task.objectifColor = form.objectif.color;
      task.start = startDate;
      task.end = endDate;

      const finalObjectif: Objectif = new Objectif;
      finalObjectif.id = form.objectif.id;
      finalObjectif.userId = form.objectif.userId;
      finalObjectif.title = form.objectif.title;
      finalObjectif.start = form.objectif.start;
      finalObjectif.end = form.objectif.end;
      finalObjectif.color = form.objectif.color;
      finalObjectif.active = form.objectif.active;
      finalObjectif.tasks = form.objectif.tasks;

      finalObjectif.addTask(task);
      this.calendarService.updateObjetif(finalObjectif).subscribe(res => {
        console.log('task created');
        this.dialogRef.close({ refresh: true });
      });
    }
    else {
      this.snackBarService.openSnackBar('La tache des n\'est pas conforme à l\'objectif', 'erreur')
    }
  }

  updateTask(form: any) {
    console.log(form);
    let startTime = moment(form.startTime, ["HH:mm A"]).format("HH:mm");
    let endTime = moment(form.endTime, ["HH:mm A"]).format("HH:mm");
    const splitStartTime = startTime.split(":");
    const splitEndTime = endTime.split(":");
    const startDate = moment(form.startDate).add({ hours: Number(splitStartTime[0]), minutes: Number(splitStartTime[1]) }).format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment(form.endDate).add({ hours: Number(splitEndTime[0]), minutes: Number(splitEndTime[1]) }).format('YYYY-MM-DD HH:mm:ss');

    this.objectifs$.subscribe((res: Array<Objectif>) => {
      let objectif: Objectif;

      res.forEach((obj: Objectif) => {
        obj.tasks.forEach((task: Task) => {
          if (task.id === this.task.id) {
            objectif = obj;
          }
        })
      });
      if (moment(objectif.start) < moment(startDate) && moment(endDate) < moment(objectif.end) && moment(startDate) < moment(endDate)) {
        const task: Task = new Task();
        task.title = form.title;
        task.place = form.place;
        task.id = this.task.id;
        task.successLevel = this.task.successLevel;
        task.objectifId = objectif.id;
        task.objectifColor = objectif.color;
        task.start = startDate;
        task.end = endDate;

        var index = _.findIndex(objectif.tasks, { id: task.id });
        // Replace item at index using native splice
        objectif.tasks.splice(index, 1, task);

        this.calendarService.updateObjetif(objectif).subscribe(res => {
          this.dialogRef.close({ refresh: true, type: 'update' });
        });
      }
      else {
        this.snackBarService.openSnackBar('La tache des n\'est pas conforme à l\'objectif', 'erreur')
      }
    });
  }

  onChange(event: any) {
    console.log(event);
    this.selectedObjectif = event.value;
  }


  deleteTask(task: Task) {
    var index = _.findIndex(this.objectif.tasks, { id: task.id });
    // Replace item at index using native splice
    this.objectif.tasks.splice(index, 1);
    this.calendarService.updateObjetif(this.objectif).subscribe(res => {
      this.dialogRef.close({ refresh: true, type: 'delete' });
    });
  }
}
