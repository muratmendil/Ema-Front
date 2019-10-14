import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MAT_DATE_FORMATS, DateAdapter, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import * as moment from 'moment';
import { User } from '@app/calendar/models/user';
import { CalendarServices } from '@app/calendar/services/calendarServices';
import { AuthService } from '@app/calendar/services/authService';
import { Objectif } from '@app/calendar/models/objectif';
import { AppDateAdapter, APP_DATE_FORMATS } from '@app/calendar/adapter/appDateAdapter';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-update-objectif',
  templateUrl: './update-objectif.component.html',
  styleUrls: ['./update-objectif.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class UpdateObjectifComponent implements OnInit , AfterViewInit{

  myForm: FormGroup;
  times: Array<string> = new Array();
  user : User = new User();
  color : string;
  defaultColor = '#eee';

  constructor(fb: FormBuilder, private calendarService :  CalendarServices, private authService : AuthService, 
    public dialogRef: MatDialogRef<NewTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.myForm = fb.group({
          'title': [ data.objectif.title, Validators.compose([ Validators.required ]) ],
          'start': [ data.objectif.start, Validators.compose([ Validators.required ])],
          'end': [ data.objectif.end, Validators.compose([ Validators.required ])],
          'color': [ data.objectif.color, null],
        });
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.setupTimePicker();
  }


  ngAfterViewInit(): void {
    this.myForm.controls['color'].setValue('#eee');
  }

  setupTimePicker(){
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
    this.times.push(':00 PM');
    this.times.push(':30 PM');
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

  
  createObjectif(form:any){
    if( this.myForm.controls['color'].value == 'none' ||  !this.myForm.controls['color'].value){
      console.log('choisissez une couleur');
    }else{
      let objectif = new Objectif();
      objectif = form;
      objectif.start = moment(form.start).format('YYYY-MM-DD HH:mm:ss');
      objectif.end = moment(form.end).format('YYYY-MM-DD HH:mm:ss');
      objectif.userId = this.user.id;
      console.log(objectif);
      this.calendarService.createObjectif(objectif).subscribe(res => {
          console.log(res);
      });
    }
  }

  changeColor(color:any){
    this.myForm.controls['color'].setValue(color);
  }
}
