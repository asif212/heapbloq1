import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  isShowRply:number=-1;
  constructor() { }

  ngOnInit() {
  }
  showRply(index){
    this.isShowRply=index;

  }
}
