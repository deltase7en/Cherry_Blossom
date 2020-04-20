import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../post.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  private postId: string;


  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(){
    console.log(this.post);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("postId")){
        console.log(this.post);
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.post = this.postsService.getPost(this.postId);
      }else{
        this.mode = "create";
        this.postId = null;
      }
    });
  }
  /*
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  */

  onSavePost(form: NgForm){
    if(form.invalid){
      return;
    }
    if(this.mode === "create"){
      this.postsService.addPost(form.value.title, form.value.content);
    }else{
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
