import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from "../models/user";
import { HttpHeaders } from "@angular/common/http";
import { HttpService } from "@app/core";


@Injectable()
export class UserService {

    private finalUrl: string = '/auth';
    private logUserUrl = `${this.finalUrl}/login`;
    private signUpUserUrl = `${this.finalUrl}/signUp`;
    headers = new HttpHeaders();

    constructor(private _http: Http, private httpService: HttpService) {
        //Le Header pour les post
        this.headers.set('Content-Type', 'application/json')
    }

    logUser(user: User) {
        return this.httpService.post(this.logUserUrl, user, { headers: this.headers }).map((response: any) => response);
    }

    // findById(id: string) {
    //     return this.httpService.get(this.finalUrl, { params: { id: id } }).map((response: any) => response);
    // }

    signUpUser(user: User) {
        return this.httpService.post(this.signUpUserUrl, user, { headers: this.headers }).map((response: any) => response);
    }
}