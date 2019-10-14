export class User{
    id : number;
    firstName: string;
    lastName : string;
    email: string;
    password: string;
    birthDate: string;
    role : string;
    
    getEmail(){
        return this.email;
    }

    getPassword(){
        return this.password;
    }

    getId() {
        return this.id;
    }

     setId(id : number) {
        this.id = id;
    }

    getFirstName() {
        return this.firstName;
    }

     setFirstName(firstName : string) {
        this.firstName = firstName;
    }

    getLastName() {
        return this.lastName;
    }

     setLastName(lastName : string) {
        this.lastName = lastName;
    }


    setEmail(email : string) {
        this.email = email;
    }

    setPassword(password : string) {
        this.password = password;
    }

    getBirthDate() {
        return this.birthDate;
    }

     setBirthDate(birthDate : string) {
        this.birthDate = birthDate;
    }
}