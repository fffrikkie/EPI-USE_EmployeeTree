import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import { Router } from '@angular/router';

interface EmpNode {
  title: string;
  id: string;
  schedule: string[];
  reports_to: string;
  children: EmpNode[];
}

const TREE_DATA: EmpNode[] = [];

@Component({
  selector: 'app-hierarchy-screen',
  templateUrl: './hierarchy-screen.component.html',
  styleUrls: ['./hierarchy-screen.component.css']
})

export class HierarchyScreenComponent implements OnInit {
  treeControl = new NestedTreeControl<EmpNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<EmpNode>();

  constructor(private serviceDing : DataService, private router: Router) {
    let x = document.cookie;
    console.log("COOKIE: "+x);
    if (x === "") {
      this.router.navigateByUrl('/login');
      return;
    }
    const temp = this.serviceDing.addData();

    temp.then(() => {
      let x = document.cookie;
      let empID = x.substring(6, x.length);
      let index = 0;
      for (let i = 0; i < arguments[0].allUsers.length; i++) {
        if (arguments[0].allUsers[i].id === empID) {
          index = i;
        }        
      }
      TREE_DATA.push(arguments[0].allUsers[index]);
      this.dataSource.data = TREE_DATA;
    })
  }
  hasChild = (_: number, node: EmpNode) => !!node.children && node.children.length > 0;
  
  ngOnInit(): void {
  }
}
