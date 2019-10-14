import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class SideNavService {

    private actionSideNavSource = new BehaviorSubject(false);
    actionSideNav = this.actionSideNavSource.asObservable();

    toggleSideNav(value: boolean) {
        this.actionSideNavSource.next(value);
    }
}
