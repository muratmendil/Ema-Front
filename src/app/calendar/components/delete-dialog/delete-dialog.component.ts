import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {


  message : string;
  constructor( public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.message;
   }

  ngOnInit() {
  
  }


  accept(){
    this.dialogRef.close({next: true});
  }
  decline(){
    this.dialogRef.close({next: false});
  }
}
