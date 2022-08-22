import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('');
  password = new FormControl('');

  constructor(private service : DataService, private router: Router) {
    let x = document.cookie;
    if (x !== "") {
      this.router.navigateByUrl('home');
    }
  }

  ngOnInit(): void {
  }

  public login() {
    // this.service.addUsersToDatabase(); WAS USED TO ADD USERS TO FIREBASE
    // this.service.addSysDataToDatabase(); WAS USED TO ADD SYSTEM DATA TO FIREBASE
    this.service.authUser(this.username.value, this.password.value);
  }

}
