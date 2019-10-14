import { Injectable } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { User } from "../models/user";
import { Objectif } from "../models/objectif";
import { Task } from "../models/task";
import { BehaviorSubject } from "rxjs";


@Injectable()
export class EventUserDataService {
    private tasks: BehaviorSubject<Array<Task>> = new BehaviorSubject(Array<Task>());
    private objectifs: BehaviorSubject<Array<Objectif>> = new BehaviorSubject(Array<Objectif>());

  constructor() { }
  
    getObjectifs(){
        return this.objectifs.asObservable();
    }

    getTasks(){
    return this.tasks.asObservable();
    }
    setObjectifs(value : Array<Objectif>){
        this.objectifs.next(value);
        this.objectifs.asObservable();
    }

    setTasks(value : Array<Task>){
        this.tasks.next(value);
        this.tasks.asObservable();
    }
}