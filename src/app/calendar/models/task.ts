export class Task{
    id : number;
    objectifId: number;
    title: string;
    start : string;
    end : string;
    place: string;
    priorityLevel: number;
    objectifColor : string;
    successLevel : number;

    getId() {
        return this.id;
    }

     setId(id : number) {
        this.id = id;
    }

    getObjectifId() {
        return this.objectifId;
    }

     setObjectifId(objectifId : number) {
        this.objectifId = objectifId;
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

    getPlace() {
        return this.place;
    }

     setPlace(place : string) {
        this.place =place;
    }

    getPriorityLevel() {
        return this.priorityLevel;
    }

     setPriorityLevel(priorityLevel : number) {
        this.priorityLevel = priorityLevel;
    }

    
    getObjectifColor() {
        return this.objectifColor;
    }

    setObjectifColor(objectifColor : string) {
        this.objectifColor = objectifColor;
    }

    getSuccessLevel() {
        return this.successLevel;
    }

     setSuccessLevel(successLevel : number) {
        this.successLevel = successLevel;
    }
}