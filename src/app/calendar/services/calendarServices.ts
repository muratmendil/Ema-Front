import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import * as environnement from 'environments/environment';

import { Task } from "../models/task";
import { Objectif } from "../models/objectif";
import { BehaviorSubject } from "rxjs";
import { HttpService } from "@app/core";
import { HttpHeaders } from "@angular/common/http";
import { Note } from "../models/note";

@Injectable()
export class CalendarServices {

    private actionFilterEvent = new BehaviorSubject(Array<Task>());
    actionFilter = this.actionFilterEvent.asObservable();
    private calendarApiUrl : string = '/calendar';
    private noteApiUrl : string = '/note';
    

    constructor(private _http: Http, private httpService : HttpService) { }

    getObjectifs(userId: number) {
        const objectifRoute = `${this.calendarApiUrl}/user/${userId}/objectifs`;
        return this.httpService.get(objectifRoute).map((response: any) => response);
    }

    getTask(userId: number, taskId : number) {
        const taskRoute = `${this.calendarApiUrl}/user/${userId}/task/${taskId}}`;
        return this.httpService.get(taskRoute).map((response: any) => response);
    }
    getTasks(userId: number) {
        
        const taskRoute = `${this.calendarApiUrl}/user/${userId}/objectifs/tasks`;
        return this.httpService.get(taskRoute).map((response: any) => response);
    }

    getObjectifTasks(userId: number, objectifId: number) {
        const taskRoute = `${this.calendarApiUrl}/user/${userId}/objectif/${objectifId}/tasks`;
        return this.httpService.get(taskRoute).map((response: any) => response);
    }

    createTask(task: Task) {
        const newTaskRoute = `${this.calendarApiUrl}/newTask`;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json')
        return this.httpService.post(newTaskRoute, task, { headers: headers }).map((response: any) => response);
    }

    createObjectif(objectif: Objectif) {
        const newObjectifRoute = `${this.calendarApiUrl}/newObjectif`;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json')
        return this.httpService.post(newObjectifRoute, objectif, { headers: headers }).map((response: any) => response);
    }

    deleteTask(task: Task) {
        const deleteTaskRoute = `${this.calendarApiUrl}/deleteTask/${task.id}`;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json')
        return this.httpService.delete(deleteTaskRoute, { headers: headers }).map((response: any) => response);
    }



    deleteObjectif(objectif: Objectif) {
        const deleteObjectifRoute = `${this.calendarApiUrl}/deleteObjectif/${objectif.id}`;
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json')
        return this.httpService.delete(deleteObjectifRoute, { headers: headers }).map((response: any) => response);
    }


    updateTask(task: Task) {
        const updateTaskRoute = `${this.calendarApiUrl}/updateTask`;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json')
        return this.httpService.put(updateTaskRoute, task, { headers: headers }).map((response: any) => response);
    }

    updateObjetif(objectif: Objectif) {
        const updateObjectifRoute = `${this.calendarApiUrl}/updateObjectif`;
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json')
        return this.httpService.put(updateObjectifRoute, objectif, { headers: headers }).map((response: any) => response);
    }

    filterEvent(tasks: Task[]) {
        this.actionFilterEvent.next(tasks);
    }

    getObjectif(objectifId: number) {
        const objectifRoute = `${this.calendarApiUrl}/objectif/${objectifId}`;
        return this.httpService.get(objectifRoute).map((response: any) => response);
    }


    noteTask(note : any){
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json')
        return this.httpService.post(this.noteApiUrl, note, {headers : headers}).map((response: any) => response);
    }
    
}