import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

export interface scheduleItem {
  title: string,
  description: string,
  start_time: string,
  end_time: string
}

const SCHEDULE_DATA: scheduleItem[] = []

@Component({
  selector: 'app-manage-schedule-screen',
  templateUrl: './manage-schedule-screen.component.html',
  styleUrls: ['./manage-schedule-screen.component.css']
})
export class ManageScheduleScreenComponent implements OnInit {
  displayedColumns: string[] = ['title', 'start', 'end', 'description'];
  dataSource = SCHEDULE_DATA;
  dataSubSource = new MatTableDataSource<scheduleItem[]>();
  constructor(private service: DataService, private _snackBar: MatSnackBar, private router: Router) {
    let x = document.cookie;
    if (x === "") {
      this.router.navigateByUrl('/login');
      return;
    }
    let temp = this.service.loadSchedule();
    temp.then(() => {
      let tempArr : any[] = arguments[0].allUsers;
      let x = document.cookie;
      let empID = x.substring(6, x.length);
      let schedArr :any[] = [];
      tempArr.forEach(element  => {
        if (element.id === empID) {
          schedArr = element.schedule;
        }
      });

      this.dataSource = schedArr;
    });
  }

  titleIn = new FormControl('');
  descriptionIn = new FormControl('');
  startIn = new FormControl('');
  endIn = new FormControl('');
  
  titleSubIn = new FormControl('');
  descriptionSubIn = new FormControl('');
  startSubIn = new FormControl('');
  endSubIn = new FormControl('');

  showIns() {
    document.getElementById("cFooterE")!.hidden = true;
    document.getElementById("cFooterA")!.hidden = !document.getElementById("cFooterA")!.hidden;
  }

  showSubIns() {
    if (this.dataSubSource.data.length === 0) {
      this._snackBar.open('No employee data loaded!', '', {duration: 3000})
    } else {
      document.getElementById("cFooterSE")!.hidden = true;
      document.getElementById("cFooterSA")!.hidden = !document.getElementById("cFooterSA")!.hidden;
    }
  }

  clickedRows = new Set<scheduleItem>();
  clickedSubRows = new Set<scheduleItem>();
  addSchedItem() {
    let titIn = this.titleIn.value;
    let descIn = this.descriptionIn.value;
    let sT = this.startIn.value;
    let eT = this.endIn.value;
    this.service.addOwnSchedule(titIn, descIn, sT, eT);
  }

  addSubSchedItem() {
    let titIn = this.titleSubIn.value;
    let descIn = this.descriptionSubIn.value;
    let sT = this.startSubIn.value;
    let eT = this.endSubIn.value;
    let subID = this.subIDin.value;
    this.service.addSubSchedule(subID, titIn, descIn, sT, eT);
  }

  selectTitle = new FormControl('');
  selectDescription = new FormControl('');
  selectStart = new FormControl('');
  selectEnd = new FormControl('');
  
  selectSubTitle = new FormControl('');
  selectSubDescription = new FormControl('');
  selectSubStart = new FormControl('');
  selectSubEnd = new FormControl('');

  showEdit() {
    document.getElementById("cFooterA")!.hidden = true;
    document.getElementById("cFooterE")!.hidden = !document.getElementById("cFooterE")!.hidden;
  }
  showSubEdit() {
    document.getElementById("cFooterSA")!.hidden = true;
    document.getElementById("cFooterSE")!.hidden = !document.getElementById("cFooterSE")!.hidden;
  }

  editItem() {
    this.clickedRows.forEach(element => {
      this.service.updateSched(element, this.selectTitle.value, 
        this.selectDescription.value, this.selectStart.value, 
        this.selectEnd.value);
    });
  }

  editSubItem() {
    this.clickedSubRows.forEach(element => {
      this.service.updateSubSched(this.subIDin.value ,element, this.selectSubTitle.value, 
        this.selectSubDescription.value, this.selectSubStart.value, 
        this.selectSubEnd.value);
    });
  }

  delItem() {
    this.clickedRows.forEach(element => {
      this.service.deleteItem(element);
    });
  }

  delSubItem() {
    this.clickedSubRows.forEach(element => {
      this.service.deleteSubItem(this.subIDin.value, element);
    });
  }

  addRowSched(row :any) {
    this.clickedRows.clear();
    this.clickedRows.add(row);
    this.selectTitle.setValue(row.title);
    this.selectDescription.setValue(row.description);
    this.selectStart.setValue(row.start_time);
    this.selectEnd.setValue(row.end_time);
  }

  addSubRowSched(row :any) {
    this.clickedSubRows.clear();
    this.clickedSubRows.add(row);
    this.selectSubTitle.setValue(row.title);
    this.selectSubDescription.setValue(row.description);
    this.selectSubStart.setValue(row.start_time);
    this.selectSubEnd.setValue(row.end_time);
  }

  subIDin = new FormControl('');

  loadSubData() {
    let temp = this.service.loadSubSchedule(this.subIDin.value);

    temp.then((returnedArr) => {      
      if (returnedArr[0] !== "NOT A SUBOORDINATE") {
        this.dataSubSource.data = returnedArr;
        this.dataSubSource._updateChangeSubscription();
      } else {
        document.getElementById("cFooterSA")!.hidden = true;
        document.getElementById("cFooterSE")!.hidden = true;
        this.dataSubSource.data = [];
        this.dataSubSource._updateChangeSubscription();
        this.clickedSubRows.clear();
        this._snackBar.open('This employee does not fall under your hierarchy!', '', {duration: 3000})
      }
    });
  }

  ngOnInit(): void {
  }

}
