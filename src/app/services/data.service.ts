import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, query, where, doc, setDoc, updateDoc, getDocs, getDoc } from "firebase/firestore";
import * as bcrypt from 'bcryptjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";

interface EmpNode {
  title: string;
  id: string;
  schedule: string[];
  reports_to: string;
  children: EmpNode[];
}

const TREE_DATA: EmpNode[] = []

@Injectable({
  providedIn: 'root'
})
export class DataService {

// users = JSON STRING PROVIDED IN registered_users.json;

// systemData = JSON STRING PROVIDED IN system_data.json

  constructor(private fireStore: Firestore, private router: Router) {}

  empID = "";

  //////WAS USED TO ADD USERS TO FIREBASE AUTOMATICALLY INSTEAD OF MANUALLY TYPING THE RECORDS
  /*async addUsersToDatabase() {
    let obj = JSON.parse(this.users);
    let regUsers = obj.registered_users;

    const bcrypt = require('bcryptjs');

    for (let index = 0; index < regUsers.length; index++) {
      let password = regUsers[index].password;
      var hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      await setDoc(doc(this.fireStore, "registered_users", regUsers[index].id), {
        first_name: regUsers[index].first_name,
        username: regUsers[index].username,
        surname: regUsers[index].surname,
        password: hashPass
      });
    }
  }*/

  //////WAS USED TO ADD SYSTEM DATA TO FIREBASE AUTOMATICALLY INSTEAD OF MANUALLY TYPING THE RECORDS
  /*async addSysDataToDatabase() {
    let obj = JSON.parse(this.systemData);
    let sysData = obj.system_data;
    let employees = sysData.employees;
    let schedules = sysData.schedules;

    for (let index = 0; index < employees.length; index++) {
      const docData = {
        reports_to: employees[index].reports_to,
        schedule: schedules[index].schedule,
        title: employees[index].title
      };
  
      await setDoc(doc(this.fireStore, "system_data", employees[index].id), docData)
    }
  }*/

  async authUser(name: string, pass: string) {
    const q = query(collection(this.fireStore, "registered_users"), where("username", "==", name));
    const querySnapshot = await getDocs(q);
    //CHECK LENGTH == 0
    if (querySnapshot.docs.length === 0) {
      document.getElementById("isValid")!.hidden = false;
      return;
    }
    let sPass = querySnapshot.docs[0].data()['password'];
    
    const bcrypt = require('bcryptjs');
    const isPass = await bcrypt.compare(pass, sPass);
    
    if (!isPass) {
      document.getElementById("isValid")!.hidden = false;
      document.getElementById("password")?.focus();
      return;
    }

    document.cookie = "empID="+querySnapshot.docs[0].id;
    document.getElementById("isValid")!.hidden = true;

    this.router.navigateByUrl('/home');
  }

  logout() {
    document.cookie = "empID=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    this.router.navigateByUrl('/login');
    this.allUsers = [];
    // window.location.reload();
  }

  allUsers: EmpNode[] = [];

  async addData() : Promise<EmpNode[]> {
    const q = query(collection(this.fireStore, "system_data"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let newEmp : EmpNode = {
        id: doc.id,
        title: doc.data()["title"],
        schedule: doc.data()["schedule"],
        reports_to: doc.data()["reports_to"],
        children: []
      }

      this.allUsers.push(newEmp);
    });

    this.allUsers.forEach(element => {
      let currID = element.id;
      this.allUsers.forEach(innerElement => {
        if (innerElement.reports_to === currID) {
         element.children.push(innerElement);
        }
      });
    });

    return this.allUsers;
  }


  
  async loadSchedule() : Promise<any[]> {
    let x = document.cookie;
    let empID = x.substring(6, x.length);
    
    const docRef = doc(this.fireStore, "system_data", empID);
    const docSnap = await getDoc(docRef);

    let currSchedules = docSnap.data()!['schedule'];
    return currSchedules;
  }
  isChild: boolean = false;
  async loadSubSchedule(subID: string) : Promise<any[]> {
    this.checkIfSub(subID);

    if (!this.isChild) {
      return ["NOT A SUBOORDINATE"];
    }

    this.isChild = false;
    const docRef = doc(this.fireStore, "system_data", subID);
    const docSnap = await getDoc(docRef);
    
    let currSchedules = docSnap.data()!['schedule'];
    return currSchedules;
  }

  checkIfSub(ID: string) {
    let x = document.cookie;
    let empID = x.substring(6, x.length);
    let childArr : EmpNode[]= [];
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.allUsers[i].id === empID) {
        childArr = this.allUsers[i].children;
      }      
    }

    for (let i = 0; i < childArr.length; i++) {
      this.checkChild(childArr[i], ID);
    }
  }

  checkChild(currEmp: EmpNode, ID: string) {
    if (currEmp.id === ID) {
      this.isChild = true;
    }
    for (let i = 0; i < currEmp.children.length; i++) {
      this.checkChild(currEmp.children[i], ID);
    }
  }

  async addOwnSchedule(titleIn: string, descIn: string, sT: string, eT: string) {
    let x = document.cookie;
    let empID = x.substring(6, x.length);

    const docRef = doc(this.fireStore, "system_data", empID);
    const docSnap = await getDoc(docRef);
    
    let currSchedules = docSnap.data()!['schedule'];
    let newSched: scheduleItem = {
      title: titleIn,
      description: descIn,
      start_time: sT,
      end_time: eT
    }

    currSchedules.push(newSched);

    await updateDoc(docRef, {
      "schedule": currSchedules
    });

    window.location.reload();
  }

  async addSubSchedule(subID: string, titleIn: string, descIn: string, sT: string, eT: string) {
    const docRef = doc(this.fireStore, "system_data", subID);
    const docSnap = await getDoc(docRef);
    
    let currSchedules = docSnap.data()!['schedule'];
    let newSched: scheduleItem = {
      title: titleIn,
      description: descIn,
      start_time: sT,
      end_time: eT
    }

    currSchedules.push(newSched);

    await updateDoc(docRef, {
      "schedule": currSchedules
    });

    window.location.reload();
  }

  async updateSched(rowItem: any, newT:string, newD:string, newS:string, newE:string) {
    let x = document.cookie;
    let empID = x.substring(6, x.length);

    const docRef = doc(this.fireStore, "system_data", empID);
    const docSnap = await getDoc(docRef);
    
    let currSchedules = docSnap.data()!['schedule'];

    for (let i = 0; i < currSchedules.length; i++) {
      if (currSchedules[i].title === rowItem.title &&
        currSchedules[i].description === rowItem.description &&
        currSchedules[i].start_time === rowItem.start_time &&
        currSchedules[i].end_time === rowItem.end_time) {
        currSchedules[i].title = newT;
        currSchedules[i].description = newD;
        currSchedules[i].start_time = newS;
        currSchedules[i].end_time = newE;
      }
    }

    await updateDoc(docRef, {
      "schedule": currSchedules
    });

    window.location.reload();
  }

  async updateSubSched(subID: string, rowItem: any, newT:string, newD:string, newS:string, newE:string) {
    const docRef = doc(this.fireStore, "system_data", subID);
    const docSnap = await getDoc(docRef);
    
    let currSchedules = docSnap.data()!['schedule'];

    for (let i = 0; i < currSchedules.length; i++) {
      if (currSchedules[i].title === rowItem.title &&
        currSchedules[i].description === rowItem.description &&
        currSchedules[i].start_time === rowItem.start_time &&
        currSchedules[i].end_time === rowItem.end_time) {
        currSchedules[i].title = newT;
        currSchedules[i].description = newD;
        currSchedules[i].start_time = newS;
        currSchedules[i].end_time = newE;
      }
    }

    await updateDoc(docRef, {
      "schedule": currSchedules
    });

    window.location.reload();
  }

  async deleteItem(rowItem: any) {
    let x = document.cookie;
    let empID = x.substring(6, x.length);

    const docRef = doc(this.fireStore, "system_data", empID);
    const docSnap = await getDoc(docRef);
    
    let currSchedules = docSnap.data()!['schedule'];
    let newSchedules = [];

    for (let i = 0; i < currSchedules.length; i++) {
      if (currSchedules[i].title !== rowItem.title &&
        currSchedules[i].description !== rowItem.description &&
        currSchedules[i].start_time !== rowItem.start_time &&
        currSchedules[i].end_time !== rowItem.end_time) {
        newSchedules.push(currSchedules[i]);
      }
    }

    await updateDoc(docRef, {
      "schedule": newSchedules
    });

    window.location.reload();
  }

  async deleteSubItem(subID:string, rowItem: any) {
    const docRef = doc(this.fireStore, "system_data", subID);
    const docSnap = await getDoc(docRef);
    
    let currSchedules = docSnap.data()!['schedule'];
    let newSchedules = [];

    for (let i = 0; i < currSchedules.length; i++) {
      if (currSchedules[i].title !== rowItem.title &&
        currSchedules[i].description !== rowItem.description &&
        currSchedules[i].start_time !== rowItem.start_time &&
        currSchedules[i].end_time !== rowItem.end_time) {
        newSchedules.push(currSchedules[i]);
      }
    }

    await updateDoc(docRef, {
      "schedule": newSchedules
    });

    window.location.reload();
  }
}

export interface scheduleItem {
  title: string,
  description: string,
  start_time: string,
  end_time: string
}