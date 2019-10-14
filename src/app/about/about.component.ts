import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@app/calendar/services/userService';
import { Router } from '@angular/router';
import { User } from '@app/calendar/models/user';
import { SnackBarService } from '@app/shared/service/snackBarService';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  version: string = environment.version;
  myForm: FormGroup;
  user: User = new User();

  constructor(fb: FormBuilder, private userServices: UserService, private router: Router, private snackBarService : SnackBarService) {
    this.myForm = fb.group({
      'lastName': [null, Validators.compose([Validators.required])],
      'firstName': [null, Validators.compose([Validators.required])],
      'birthDate': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  signUpUser(res: any) {
    this.user = res;
    this.userServices.signUpUser(this.user).subscribe((res : any)=> {
      console.log(res);
      if (res.email) {
        this.snackBarService.openSnackBar("Votre compte a été créer", "Succèss");
        this.router.navigate(['/login']);
      } else {
        console.log("email exist");
        this.snackBarService.openSnackBar("Email exist déja", "Erreur");
      }
    });
  }

  goToSignInPage(){
    this.router.navigate(['/login']);
  }
}
