import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { Post } from "../models/post";
import { HttpService } from "@app/core";
import { HttpHeaders } from "@angular/common/http";



@Injectable()
export class PostService {
    private forumUrl: string = '/forum';

    headers = new HttpHeaders();

    constructor(private httpService: HttpService) {
        this.headers.set('Content-Type', 'application/json')
    }

    createPost(post: Post) {
        return this.httpService.post(`${this.forumUrl}/newPost`, post, { headers: this.headers }).map((response: any) => response);
    }

    getAllPost() {
        return this.httpService.get(`${this.forumUrl}/getAllPost`, { headers: this.headers }).map((response: any) => response);
    }
}