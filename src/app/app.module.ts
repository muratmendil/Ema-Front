import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ShellModule } from './shell/shell.module';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CalendarModule } from './calendar/calendar.module';
import { AuthenticatedGuard } from './calendar/guard/AuthenticatedGuard';
import * as $ from 'jquery';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    ShellModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    HomeModule,
    CalendarModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [AuthenticatedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
