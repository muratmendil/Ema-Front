import { Injectable } from "@angular/core";
import { Http} from "@angular/http";
import { User } from "../models/user";
import {Router } from "@angular/router";


@Injectable()
export class AuthService {
    private redirectUrl: string = '/';
	private loginUrl: string = '/login';
	private isloggedIn: boolean = false;
	private loggedInUser: User;

  constructor(private _http: Http, private router : Router) { }
  
    getIsloggedIn() : boolean{
        if(localStorage.getItem("currentUser")){
            return true;
        }else{
            return false;
        }
    }

    getUser() : User{
        return JSON.parse(localStorage.getItem("currentUser"));
    }

    setLoggedInUser(user : User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    setRedirectUrl(url: string): void {
        this.redirectUrl = url;
    }

    getLoginUrl(): string {
        return this.loginUrl;
    }

    logoutUser(): void{
        localStorage.removeItem("currentUser");
    }
}