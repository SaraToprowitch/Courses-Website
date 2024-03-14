// // // import { NgModule } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { ReactiveFormsModule } from '@angular/forms';
// // // import { AllCoursesComponent } from './all-courses.component';
// // // import { HttpClient, HttpClientModule } from '@angular/common/http';



// // @NgModule({
// //   // הקומפוננטות שמוגדרות לאותה הקטגוריה
// //   // נוסיף פה גם את הדיירקטיבים והפייפים שישמשו אותנו לקומפוננטות האלו
// //   declarations: [AllCoursesComponent],
// //   // כל המודולים והדברים החיצוניים שנרצה להתשמש בהם בקומפוננטות שלנו
// //   imports: [
// //     CommonModule, HttpClientModule,ReactiveFormsModule],
// //   // הקומפוננטה שאותה אנחנו מיצאות הראשונה
// //    exports: [AllCoursesComponent],
// //   // סרויס שיצרנו רק בשביל הקומפוננטות הפנימיות
// //     //provider: [RecipeService]
// // })
// // export class CourseModule { }
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { AllCoursesComponent } from './all-courses/all-courses.component';
// import { AppRoutingModule } from './course-routing.module';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @NgModule({
//   declarations: [AllCoursesComponent],
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     RouterModule,
//     AppRoutingModule,
//     HttpClientModule
//   ],
//   exports: [AllCoursesComponent]
// })
// export class CourseModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import {  CourseRoutingModule } from './course-routing.module';
import { HttpClientModule } from '@angular/common/http'; // שימוש ב-HttpClientModule, לא ב-HttpClient
import { RecipeService } from '../course.service';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import "primeng/resources/themes/lara-light-blue/theme.css";
import "primeng/resources/primeng.css";
import "primeicons/primeicons.css";
import { LearningWayPipe } from '../learning-way.pipe';
import { AddCourseComponent } from './add-course/add-course.component';
@NgModule({
  declarations: [AllCoursesComponent,CourseDetailsComponent,AddCourseComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CourseRoutingModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    LearningWayPipe
  ],
  exports: [AllCoursesComponent]
})
export class CourseModule { }

