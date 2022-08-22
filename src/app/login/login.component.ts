import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('');
  password = new FormControl('');

  constructor(private service : DataService) { }

  ngOnInit(): void {
    let x = document.cookie;
    console.log("LOGIN COOKIE: "+x)
  }

  public login() {
    // this.service.addUsersToDatabase(); WAS USED TO ADD USERS TO FIREBASE
    // this.service.addSysDataToDatabase(); WAS USED TO ADD SYSTEM DATA TO FIREBASE
    this.service.authUser(this.username.value, this.password.value);
  }

}
