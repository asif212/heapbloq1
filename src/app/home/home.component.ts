import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  userGender: string = 'Gender';
  showDropDown: boolean = false;
  loginForm: boolean = false;
  constructor() {

  }

  ngOnInit() {

  }

  genderDropDown() {
    this.showDropDown = !this.showDropDown;
    console.log(this.showDropDown);
  }

  setGender(index) {
    if (index == 1) {
      this.userGender = 'MALE';
      this.showDropDown = false;
      console.log(1);
    }
    else {
      this.userGender = 'FEMALE';
      this.showDropDown = false;
      console.log(2);
    }

  }

  formToggle() {
    this.loginForm = !this.loginForm;
  }

}
