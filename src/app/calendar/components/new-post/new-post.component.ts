import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '@app/calendar/models/user';
import { AuthService } from '@app/calendar/services/authService';
import { PostService } from '@app/calendar/services/postService';
import { Post } from '@app/calendar/models/post';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent implements OnInit {

  myForm: FormGroup;
  user: User = new User();

  constructor(fb: FormBuilder, private authService: AuthService, private postService: PostService, public dialogRef: MatDialogRef<NewPostComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.myForm = fb.group({
      'title': [null, Validators.compose([Validators.required])],
      'message': [null, Validators.compose([Validators.required])]
    });
  }


  ngOnInit() {
    this.user = this.authService.getUser();
  }

  createPost(form: any) {
    const post: Post = new Post();
    post.title = form.title;
    post.message = form.message;
    post.userId = this.user.id;
    post.firstname = this.user.firstName;
    post.lastname = this.user.lastName;

    console.log(post);

    this.postService.createPost(post).subscribe((res: any) => {
      if (res) {
        this.dialogRef.close({ status: true });
      }
    })
  }


}