import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { HierarchyScreenComponent } from "./hierarchy-screen/hierarchy-screen.component";
import { ManageScheduleScreenComponent } from "./manage-schedule-screen/manage-schedule-screen.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: 'hierarchy', component: HomePageComponent},
  { path: 'manage-schedule', component: HomePageComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
