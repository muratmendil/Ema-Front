import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@app/calendar/services/userService';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthService } from '@app/calendar/services/authService';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    QuoteService,
    UserService,
    AuthService,
  ]
})
export class HomeModule { }
