import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private service : DataService, private router: Router) {
    let x = document.cookie;
    console.log("COOKIE: "+x);
    if (x === "") {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.service.logout();
  }

}
