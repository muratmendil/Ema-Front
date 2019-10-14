import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { QuoteService } from '@app/home/quote.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { Task } from '@app/calendar/models/task';
import { CalendarServices } from '@app/calendar/services/calendarServices';
import { Note } from '@app/calendar/models/note';

@Component({
  selector: 'app-note-task',
  templateUrl: './note-task.component.html',
  styleUrls: ['./note-task.component.scss']
})
export class NoteTaskComponent implements OnInit {

  
  quote: string;
  isLoading: boolean;
  myForm2: FormGroup;
  regex = '^[1-9]?[0-9]{1}$|^100$';
  task : Task;

  constructor(private quoteService: QuoteService, fb: FormBuilder, public dialogRef: MatDialogRef<NewTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private calendartService : CalendarServices) {
    this.task = data.task;
    this.myForm2 = fb.group({
      'note': [this.task.successLevel, Validators.compose([Validators.required, Validators.pattern(this.regex)])],
    });
  }

  ngOnInit() {

  }

  async saveNote(form : any){
   this.calendartService.noteTask(
     {note : Number(form.note), 
      task_id: this.task.id,
      task_name: this.task.title}).subscribe((res : Note) => {
    if(res){
      this.task.successLevel = res.note;
      this.dialogRef.close({canSave : true, note : res, task: this.task});
     }
   })
  }

}
