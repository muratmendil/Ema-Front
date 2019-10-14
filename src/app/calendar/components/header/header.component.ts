import { Component, OnInit } from '@angular/core';
import { SideNavService } from '@app/calendar/services/sidenavService';
import { AuthService } from '@app/calendar/services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sideNavservice : SideNavService, private authService : AuthService, private router : Router) { }

  ngOnInit() {
  }


  toggleDrawer(){
    this.sideNavservice.toggleSideNav(true);
  }

  deconnexion(){
    this.authService.logoutUser();
    this.router.navigate([this.authService.getLoginUrl()]);
  }
}
