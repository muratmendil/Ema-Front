import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '@app/calendar/models/post';
import { PostService } from '@app/calendar/services/postService';
import { Observable } from 'rxjs';
import { UserService } from '@app/calendar/services/userService';
import { User } from '@app/calendar/models/user';
import { NewPostComponent } from '../new-post/new-post.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private router: Router, private postService: PostService, private userService: UserService, public dialog: MatDialog, ) { }
  array = [Post]

  posts$: Observable<Array<any>>;

  async ngOnInit() {
    this.posts$ = this.postService
      .getAllPost()
      .pipe()
      .map((res: Post[]) => res);

    // const post = await this.postService.getAllPost();
    /*
    this.posts$ = this.postService.getAllPost().pipe().map((res : Post[] )  => {
      return res.map((post : Post) => {
            this.userService.logUser(new User()).pipe().map((user : User) => {message : post.getMessage; nom: user.firstName})
      })
    }); */
  }

  newPost() {
    console.log(event);
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.refresh) {

      }
    });
  }

  // getUser(id: number): Observable<User> {
  //   return this.userService.findById(id.toString()).pipe().map(res => res);
  // }
}