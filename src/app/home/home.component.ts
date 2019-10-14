import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '@app/calendar/models/user';
import { UserService } from '@app/calendar/services/userService';
import { Router } from '@angular/router';
import { AuthService } from '@app/calendar/services/authService';
import { SnackBarService } from '@app/shared/service/snackBarService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;
  myForm: FormGroup;
  user: User = new User();

  constructor(private quoteService: QuoteService, fb: FormBuilder, private userServices: UserService, private router: Router, private authService: AuthService, private snackBarService : SnackBarService) {
    this.myForm = fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.quoteService.getRandomQuote({ category: 'dev' })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((quote: string) => { this.quote = quote; });
  }

  logUser(res: any) {
    this.user.email = res.email;
    this.user.password = res.password;

    this.userServices.logUser(this.user).subscribe((res :any) => {
      if (res.email) {
        this.user = res;
        this.authService.setLoggedInUser(this.user);
        this.router.navigate(['/calendar']);
      } else {
        this.snackBarService.openSnackBar("Email ou mot de passe incorrect", "");
      }
    })
  }

  goToSignUpPage(){
    this.router.navigate(['/signUp']);
  }
}

