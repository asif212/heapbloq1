import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: 'category.component.html',
  styleUrls: ['category.component.scss']
})
export class CategoryComponent implements OnInit {
   @Output() valueChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  valueChanged() { // You can give any function name
       // console.log("start");
       this.valueChange.emit();
   }

}
