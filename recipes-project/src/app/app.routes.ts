import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AllCoursesComponent } from './course/all-courses/all-courses.component';
import { NgModule } from '@angular/core';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", loadComponent: () => import('./login/login.component').then(c => c.LoginComponent) },
    { path: 'register', component: RegisterComponent },
    { path: 'logout', component: LogoutComponent },
    { path: "course", loadChildren: () => import('./course/course.module').then(c => c.CourseModule) }
 ];

