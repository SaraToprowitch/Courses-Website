// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

const routes: Routes = [
    { path: '', redirectTo: 'allCourses', pathMatch: 'full' },
   { path: "allCourses", component:AllCoursesComponent },
   { path: 'addCourse/:id', component: AddCourseComponent },
   { path: "courseDetails/:id", component: CourseDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }

