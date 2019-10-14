export class Note{
    id : number;
    note: number;
    task_id: number;
    task_name: string;

    getId() {
        return this.id;
    }

     setId(id : number) {
        this.id = id;
    }

    getNote() {
        return this.note;
    }

     setNode(note : number) {
        this.note = note;
    }
    getTaskId() {
        return this.task_id;
    }

     setTaskId(taskId : number) {
        this.task_id = taskId;
    }
    getTaskName() {
        return this.task_name;
    }

    setTaskName(taskName : string) {
        this.task_name = taskName;
    }
}