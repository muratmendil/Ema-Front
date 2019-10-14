import { Task } from "./task";

export class Objectif{
    id : number;
    userId : number;
    title: string;
    start : string;
    end : string;
    color: string;
    active: boolean;
    tasks : Array<Task> = new Array<Task>();
    
    getId() {
        return this.id;
    }

     setId(id : number) {
        this.id = id;
    }

    getActive(){
        return this.active;
    }

    setActive(active : boolean){
        this.active = active;
    }
    getUserId() {
        return this.userId;
    }

     setUserId(userId : number) {
        this.userId = userId;
    }
    getTitle() {
        return this.title;
    }

    setTitle(title : string) {
        this.title = title;
    }
    
    getStart(){
        return this.start;
    }

    setStart(start : string){
        this.start = start;
    }

    getEnd(){
        return this.end;
    }

    setEnd(end : string){
        this.end = end;
    }

    getColor() {
        return this.color;
    }

     setColor(color : string) {
        this.color =color;
    }

    getTask() {
        return this.tasks;
    }

    setTask(tasks: Task[]) {
        this.tasks = tasks;
    }

    addTask(task : Task){
        this.tasks.push(task);
    }
}
