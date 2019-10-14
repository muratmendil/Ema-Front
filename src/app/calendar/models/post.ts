export class Post {

    _id: number;
    userId: number;
    title: string;
    message: string;
    firstname: string;
    lastname: string;

    getId() {
        return this._id;
    }

    setId(id: number) {
        this._id = id;
    }

    getUserId() {
        return this.userId;
    }

    setUserId(userId: number) {
        this.userId = userId;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title: string) {
        this.title = title;
    }

    getMessage() {
        return this.message;
    }

    setMessage(message: string) {
        this.message = message;
    }

    getFirstName() {
        return this.firstname;
    }

    setFirstName(firstname: string) {
        this.firstname = firstname;
    }

    getLastName() {
        return this.firstname;
    }

    setLastName(lastname: string) {
        this.lastname = lastname;
    }
}
