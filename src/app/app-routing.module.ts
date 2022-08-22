import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { HierarchyScreenComponent } from "./hierarchy-screen/hierarchy-screen.component";
import { ManageScheduleScreenComponent } from "./manage-schedule-screen/manage-schedule-screen.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path: 'hierarchy', redirectTo: '/home', pathMatch: 'full'},
  { path: 'manage-schedule', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
