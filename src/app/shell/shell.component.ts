import { Component, OnInit, ViewChild } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private media: ObservableMedia) { }

  ngOnInit() {
    // Automatically close side menu on screens > sm breakpoint
    
  }

}
