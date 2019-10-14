import { Component, OnInit } from '@angular/core';
import { User } from '@app/calendar/models/user';
import { AuthService } from '@app/calendar/services/authService';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user : User = new User();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

}
