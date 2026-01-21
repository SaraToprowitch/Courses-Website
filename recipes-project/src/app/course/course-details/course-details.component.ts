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
