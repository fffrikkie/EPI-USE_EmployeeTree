import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'EPI-USE EmployeeTree';
  isLoggedin = false;
  constructor(private service: DataService) {
    let x = document.cookie;
    if (x !== "") {
      this.isLoggedin = true;
    }
  }

  ngOnInit(): void {
  }
}
