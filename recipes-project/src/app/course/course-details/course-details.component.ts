// // import { Component, Input } from '@angular/core';
// // import { Course } from '../../Course.model';

// // @Component({
// //   selector: 'app-course-details',
// //   templateUrl: './course-details.component.html',
// //   styleUrls: ['./course-details.component.scss']
// // })
// // export class CourseDetailsComponent  {
// //   @Input() course!: Course;
// //   formattedBeginningDate: string = '';

// //   ngOnInit(): void {
// //     this.formatBeginningDate();
// //   }

// //   // פונקציה זו מפורמטת את התאריך התחלת הקורס
// //   formatBeginningDate(): void {
// //     if (this.course.beginnigDate) {
// //       const date = new Date(this.course.beginnigDate);
// //       this.formattedBeginningDate = date.toLocaleDateString(); // מפורמטת את התאריך לפורמט מקומי
// //     }
// //   }
// //   // פונקציה זו מחזירה את האייקון המתאים לקטגוריה
// //   getCategoryIcon(categoryId: any): string {
// //     // כאן תוכלי להוסיף לוגיקה כדי להחזיר אייקון בהתאם לקטגוריה
// //     return 'icon-url';
// //   }

// //   // פונקציה זו מחזירה את אופן הלמידה בעברית
// //   getLearningWay(learningWay: any): string {
// //     if (learningWay === 'Zoom') {
// //       return 'זום';
// //     } else if (learningWay === 'Frontal') {
// //       return 'לימוד פנים אל פנים';
// //     }
// //     return '';
// //   }

// //   // פונקציה זו מוודאת אם המשתמש הנוכחי הוא המרצה של הקורס
// //   isTeacher(speakerId: any): boolean {
// //     if(this.course.speacherId!=0)// כאן תוכלי להוסיף לוגיקה כדי לבדוק אם המשתמש הנוכחי הוא המרצה
// //       {return true;}  
// //     return false;     // או false, בהתאם להתאמה ללוגיקה שלך
// //   }

// //   // פונקציה זו מוודאת אם התאריך הוא בשבוע הנוכחי
// //   isCurrentWeek(date: any): boolean {
// //     console.log(this.course?.beginnigDate);

// //     const today = new Date();
// //     const beginningOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
// //     const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
// //     return date >= beginningOfWeek && date <= endOfWeek;
// //   }

// // }
// import { Component, Input } from '@angular/core';
// import { Course } from '../../Course.model';
// import "primeng/resources/themes/lara-light-blue/theme.css";
// import "primeng/resources/primeng.css";
// import "primeicons/primeicons.css";
// import { ActivatedRoute, Router } from '@angular/router';
// import { RecipeService } from '../../recipe.service';
// @Component({
//   selector: 'app-course-details',
//   templateUrl: './course-details.component.html',
//   styleUrls: ['./course-details.component.scss']
// })
// export class CourseDetailsComponent {
//   @Input() showLimitedDetails: boolean = false;
//   @Input() course!: Course;
//   formattedBeginningDate?: string = '';
//   isCurrentWeek: boolean = false;
//   private courseId!: number

//   constructor(private route:ActivatedRoute,private _productService:RecipeService){}


//   ngOnInit(): void {
//     console.log(this.course.beginnigDate);

//     this.formatBeginningDate();
//     this.isCurrentWeek = this.checkIfCurrentWeek(this.course.beginnigDate);
//     this.route.params.subscribe((param) => {
//       this.courseId = param['id'];
//       this._productService.getCourseById(this.courseId).subscribe({
//         next: (res) => {
//           this.course = res
//         },
//         error: (err) => {
//           console.log(err);
//         }
//       })
//     })
//   }

//   formatBeginningDate(): void {
//     if (this.course.beginnigDate) {
//       const date = new Date(this.course.beginnigDate);
//       this.formattedBeginningDate = date.toLocaleDateString(); 
//     }
//   }

//   checkIfCurrentWeek(dateString: any ): boolean {
//     const serverDate = new Date(dateString); // ממיר את התאריך המקורי לתאריך בפורמט Date
//     const today = new Date();
//     const beginningOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
//     const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
//     return serverDate >= beginningOfWeek && serverDate <= endOfWeek;
//   }

//   getCategoryIcon(categoryId: any): string {
//     return 'icon-url';
//   }

//   getLearningWay(learningWay: any): string {
//     if (learningWay === 'Zoom') {
//       return 'זום';
//     } else if (learningWay === 'Frontal') {
//       return 'לימוד פנים אל פנים';
//     }
//     return '';
//   }

//   isTeacher(speakerId: any): boolean {
//     return this.course.speacherId != 0;
//   }
// }
import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../Course.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RecipeService } from '../../course.service';
import { UserService } from '../../user.service';
import { LearningWayPipe } from '../../learning-way.pipe';
import { Observable, map } from 'rxjs';
import { User } from '../../User.model';
import { Lecturer } from '../../Lecturer.model';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  [x: string]: any;
  @Input() showLimitedDetails: boolean = false;
  @Input() course!: Course;


  formattedBeginningDate: string = '';
  isCurrentWeek: boolean = false;
  private courseId!: number;

  constructor(private route: ActivatedRoute,private r:Router, private _productService: RecipeService,private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.courseId = param['id'];
      this._productService.getCourseById(this.courseId).subscribe({
        next: (res) => {
          this.course = res;
          this.formatBeginningDate();
          this.isCurrentWeek = this.checkIfCurrentWeek(this.course.beginningDate);
        },
        error: (err) => {
          console.log(err);
        }
      })
    })

  }

  formatBeginningDate(): any {
    if (this.course?.beginningDate) {
      const date = new Date(this.course.beginningDate);
      this.formattedBeginningDate = date.toLocaleDateString();
    }
  }

  checkIfCurrentWeek(dateString: any): boolean {
    const serverDate = new Date(dateString);
    const today = new Date();
    const beginningOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
    return serverDate >= beginningOfWeek && serverDate <= endOfWeek;
  }

  getCategoryIcon(categoryId: any): string {
    return 'icon-url';
  }

  getLearningWay(learningWay: any): string {
    if (learningWay === 0) {
      return 'זום';
    } else if (learningWay === 1) {
      return 'פרונטלי';
    }
    return '';
  }


isTeacher(speakerId: number): boolean {
  return String(speakerId)==localStorage.getItem('id');
}

public go(){
  this.r.navigate(['/course']);
}
  public O() {
    // שמירת שם הקורס
    console.log("שם הקורס:", this.course.name);
    localStorage.setItem('name', JSON.stringify(this.course.name) || '');

    // שמירת קטגוריה
    console.log("קטגוריה:", this.course.categoryId);
    localStorage.setItem('categoryId', this.course.categoryId?.toString() || '0');

    // שמירת מספר השיעורים
    console.log("מספר השיעורים:", this.course.countLessons);
    localStorage.setItem('countLessons', this.course.countLessons || '');

    // שמירת מזהה המרצה
    console.log("מזהה המרצה:", this.course.speacherId);
    localStorage.setItem('speacherId', this.course.speacherId?.toString() || '0');

    // שמירת אופן הלמידה
    console.log("אופן הלמידה:", this.course.learningWay);
    localStorage.setItem('learningWay', this.course.learningWay?.toString() || '0');

    // שמירת כתובת התמונה
    console.log("כתובת התמונה:", this.course.image);
    localStorage.setItem('image', this.course.image || '');

  // שמירת תאריך התחלת הקורס
    console.log("תאריך התחלת הקורס:", this.course.beginningDate);
   
    // בדיקה אם הערך המוחזר הוא תאריך
        localStorage.setItem('beginningDate', this.formattedBeginningDate.toString());

    // שמירת סיליבוס
    console.log("סיליבוס:", this.course.silibus);
    localStorage.setItem('silibus', JSON.stringify(this.course.silibus) || '');

    // מעבר לדף ההוספה של הקורס
    console.log(this.course.id);
    
    this.r.navigate(['/course/addCourse',this.course.id]);
    

}

}
