import { Component } from '@angular/core';
import { Course } from '../../Course.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../Category.model';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { format, parse } from 'date-fns';
import { parseISO } from 'date-fns';

import { RecipeService } from '../../course.service';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  
  public newCourse: Course = {
    silibus: [''] 
  };
  public courseId?:number;
  static lastId: number = 7;
  public addForm!: FormGroup;
  public idCourse?:number;
  categories!: Observable<Category[]>;
  s: string[] = [];
  learningWays: string[] = ['Zoom', 'Frontal'];
  constructor(private route: ActivatedRoute, private _productService: RecipeService, private router: Router) { } // הוסף את ה-Router כמו שהוספתי כאן

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      alert(this.courseId);
  });
  
  
  this.addForm = new FormGroup({
      
    'name': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'categoryId': new FormControl(null, Validators.required),
    'countLessons': new FormControl(null, Validators.required),
    'learningWay': new FormControl(null, Validators.required),
    'beginningDate': new FormControl(null, Validators.required),
    'image': new FormControl(null, Validators.required),
    'silibus': new FormControl(null, Validators.required),
    'speacherId': new FormControl(null, Validators.required)
  });
    this.categories = this._productService.getCategoriesServer();

    this._productService.getCoursesFromServer().subscribe({
      next: (courses) => {
       const courseServer = courses.find(
          (course) => course.id == this.courseId
        );   
        if(courseServer)   {//if it exist it will be edit
         console.log(courseServer.beginningDate);
         
         //טיפול בקטגוריות
          var category:String;
          if(courseServer.categoryId==0)
            {
              category=this.learningWays[0];
            }
            else{
              category=this.learningWays[1];
            }
            //טיפול בתאריך
            const datetimeString = String(courseServer.beginningDate);
            const datetimeObject = parseISO(datetimeString); // המרת המחרוזת לאובייקט תאריך
            const dateString = format(datetimeObject, 'yyyy-MM-dd'); // המרת התאריך למחרוזת תאריך בפורמט 'yyyy-MM-dd' 

            //טיפול בסיליבוס
            console.log(courseServer.silibus);
            for (let topic of courseServer.silibus) {
              this.addSilibusField(); // הוספת תיבת קלט חדשה לכל נושא בסיליבוס
              const lastIndex = this.newCourse.silibus.length - 1; // מציאת האינדקס האחרון במערך הנוכחי
              this.newCourse.silibus[lastIndex-1] = topic; // השמת הנושא במערך הסיליבוס הנוכחי
              this.addForm.patchValue({ 'silibus': this.newCourse.silibus });
            }
            
          this.addForm.setValue({
            'name': courseServer.name,
            'categoryId': courseServer.categoryId,
            'countLessons': courseServer.countLessons,
            'learningWay': category,
            'beginningDate': dateString,
            'image': courseServer.image,
            'silibus': courseServer.silibus,
            'speacherId': courseServer.speacherId
          });
        } 
      }
      
     });

  }

  addSilibusField() {
    this.newCourse.silibus.push('');
    this.addForm.patchValue({ 'silibus': this.newCourse.silibus }); // עדכון ערך הפורם בהתאם לשינוי במערך
  }

  removeSilibusField(index: number) {
    this.newCourse.silibus.splice(index, 1);
    this.addForm.patchValue({ 'silibus': this.newCourse.silibus }); // עדכון ערך הפורם בהתאם לשינוי במערך
  }

  handleSilibuInput(event: any, index: number) {
    const value = event.target.value;
    this.s.push(value);
    if (value === '') {
      this.newCourse.silibus.splice(index, 1);
    } else {
      if (index === this.newCourse.silibus.length - 1) {
        this.addSilibusField();
      }
      
    }
    this.addForm.patchValue({ 'silibus': this.newCourse.silibus }); // עדכון ערך הפורם בהתאם לשינוי במערך
  }

  saveCourse() {
    let learningWayValue = this.addForm.get('learningWay')?.value;
    let learningWayEnum: number;

    if (learningWayValue === 'Zoom') {
      learningWayEnum = 0;
    } else {
      learningWayEnum = 1;
    }

    let beginningDateValue = this.addForm.get('beginningDate')?.value;

    let formattedBeginningDate: Date | undefined = undefined;
    
    if (beginningDateValue !== null && typeof beginningDateValue !== 'string') {
      formattedBeginningDate = beginningDateValue;
    } else if (typeof beginningDateValue === 'string') {
      formattedBeginningDate = new Date(beginningDateValue);
    }

    if(this.courseId==-1){
         this.idCourse=AddCourseComponent.lastId++;
      }
      else{
        this.idCourse=this.courseId;
      }
    let course: Course = {
      
      id: this.idCourse,
      name: this.addForm.get('name')?.value,
      categoryId: this.addForm.get('categoryId')?.value,
      countLessons: this.addForm.get('countLessons')?.value,
      learningWay: learningWayEnum, // שימוש בערך הממופה ל ENUM בשרת
      beginningDate: formattedBeginningDate,
      image: this.addForm.get('image')?.value,
      speacherId: this.addForm.get('speacherId')?.value,
      silibus: this.s
    };
  
    console.log(course);
  
    this._productService.save(course).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  
    alert("הקורס נוסף בהצלחה");
    this.router.navigate(['/course']);  }
}





// // import { Component, OnInit } from '@angular/core';
// // import { Course } from '../../Course.model';
// // import { Router } from '@angular/router';
// // import { FormControl, FormGroup, Validators } from '@angular/forms';
// // import { RecipeService } from '../../course.service';
// // import { Category } from '../../Category.model';
// // import { Observable } from 'rxjs';
// // import Swal from 'sweetalert2';
// // import { format, parse } from 'date-fns';
// // @Component({
// //   selector: 'app-add-course',
// //   templateUrl: './add-course.component.html',
// //   styleUrls: ['./add-course.component.scss']
// // })
// // export class AddCourseComponent implements OnInit {
// //   public course: Course = {
// //     silibus: ['']
// //   };
// //   public addForm!: FormGroup;
// //   categories!: Observable<Category[]>;
// //   s: string[] = [];
// //   learningWays: string[] = ['Zoom', 'Frontal'];
// //   newCourse!:Course;
// //   constructor(private router: Router, private _productService: RecipeService) { }


// //   // בפונקציה parseLocalDate
// //   parseLocalDate(dateString: string): Date | undefined {
// //     if (!dateString) return undefined;
  
// //     const [day, month, year] = dateString.split('.').map(part => parseInt(part));
// //     return new Date(year, month - 1, day);
// //   }
  
// //   ngOnInit(): void {
 
// //       // נסיר את ההשמה הקודמת שגורמת לשגיאה
// //     this.categories = this._productService.getCategoriesServer();
      
// //     const name = localStorage.getItem('name') || '';
    
    
// //     const categoryId = localStorage.getItem('categoryId') || '0'; // משתנה זה הינו ID של הקטגוריה
// //     const countLessons = localStorage.getItem('countLessons') || '';
// //     const speacherId = localStorage.getItem('speacherId') || ''; // שים לב ששמתי כאן speacherId במקום speakerId
// //     const learningWay = localStorage.getItem('learningWay') || '0';
// //     const image = localStorage.getItem('image') || '';
// //     const beginningDate = localStorage.getItem('beginningDate') || '';
// //     const silibus = localStorage.getItem('silibus') || '';
  
// //     // הגדרת ערך ברירת המחדל ל־'Frontal' אם הערך המוחזר מהאחסון המקומי הוא '0', ול־'Zoom' אחרת
// //     const defaultLearningWay = learningWay === '1' ? 'Zoom' : 'Frontal';
// //     // הגדרת הערכים בטופס
// //     this.addForm = new FormGroup({
// //       'name': new FormControl(name, [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Za-z0-9\s]+$/)]),
// //       'categoryId': new FormControl(categoryId, Validators.required), // השאיפה היא שה־value של ה־FormControl יהיה ה־ID של הקטגוריה
// //       'countLessons': new FormControl(countLessons, Validators.required),
// //       'learningWay': new FormControl(defaultLearningWay, Validators.required),
// //       'beginningDate': new FormControl(beginningDate, Validators.required), // ניתן להשתמש בתצורת התאריך שאתה משתמש בה ב-Local Storage
// //       'image': new FormControl(image, Validators.required),
// //       'silibus': new FormControl(silibus, Validators.required),
// //       'speakerId': new FormControl(speacherId, Validators.required) // כאן גם שימוש ב-speakerId
// //     });
  
// //     // קביעת הערכים במשתנים של הקורס
// //     this.course.name = name;
// //     this.course.categoryId = +categoryId ;
// //     this.course.countLessons = countLessons;
// //     this.course.speacherId = +speacherId; // המרה למספר
    
// //     this.course.image = image || undefined; // אם image אינו מוגדר, השמת undefined

// //     // פירוק התאריך לפורמט תאריך באמצעות date-fns
 
// //     // הצגת התאריך בפורמט של "yyyy-MM-dd"

// //     // המרה לאובייקט תאריך
// //     this.course.silibus = JSON.parse(silibus); // המרת silibus לאובייקט מעובד מJSON
// //   }
  



// //   addSilibusField() {
// //     this.course.silibus.push('');
// //     this.addForm.patchValue({ 'silibus': this.course.silibus });
// //   }

// //   removeSilibusField(index: number) {
// //     this.course.silibus.splice(index, 1);
// //     this.addForm.patchValue({ 'silibus': this.course.silibus });
// //   }

// //   handleSilibuInput(event: any, index: number) {
// //     const value = event.target.value;
// //     this.s.push(value);
// //     if (value === '') {
// //       this.course.silibus.splice(index, 1);
// //     } else {
// //       if (index === this.course.silibus.length - 1) {
// //         this.addSilibusField();
// //       }
// //     }
// //     this.addForm.patchValue({ 'silibus': this.course.silibus });
// //   }

// //   saveCourse() {
// //     let course: Course = {
// //      id: 0,
// //       name: this.addForm.get('name')?.value,
// //       categoryId: this.addForm.get('categoryId')?.value,
// //       countLessons: this.addForm.get('countLessons')?.value,
// //       learningWay: this.addForm.get('learningWay')?.value,
// //       beginningDate: this.addForm.get('beginningDate')?.value,
// //       image: this.addForm.get('image')?.value,
// //       speacherId: this.addForm.get('speacherId')?.value,
// //       silibus: this.addForm.get('silibus')?.value
// //     };

// //     this.saveToLocalStorage(course,this.addForm);

// //     this._productService.save(course).subscribe({
// //       next: (res) => {
// //         console.log(res);
// //         Swal.fire({
// //           icon: 'success',
// //           title: 'הקורס נוסף בהצלחה!',
// //           text: 'כעת תוכלו לראות את הקורס ברשימת הקורסים',
// //           confirmButtonText: 'אישור'
// //         });
// //         this.router.navigate(['/course']);
// //       },
// //       error: (err) => {
// //         console.log(err);
// //       }
// //     });
// //   }

// //   saveToLocalStorage(course: Course, form: FormGroup) {
// //     localStorage.removeItem('name');
// //     localStorage.removeItem('categoryId');
// //     localStorage.removeItem('countLessons');
// //     localStorage.removeItem('speakerId');
// //     localStorage.removeItem('learningWay');
// //     localStorage.removeItem('image');
// //     localStorage.removeItem('beginningDate');
// //     localStorage.removeItem('silibus'); // מחיקת המערך הקיים

// //     const emptySilibus: any[] = []; // מערך ריק
  
// //     localStorage.setItem('silibus', JSON.stringify(emptySilibus)); 
  
// //     // מחיקת נתונים מהטופס
// //     form.reset();
// //   }
// // }







// import { Component } from '@angular/core';
// import { Course } from '../../Course.model';
// import { Router } from '@angular/router';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Category } from '../../Category.model';
// import { Observable } from 'rxjs';
// import { DatePipe } from '@angular/common';
// import { RecipeService } from '../../course.service';

// @Component({
//   selector: 'app-add-course',
//   templateUrl: './add-course.component.html',
//   styleUrls: ['./add-course.component.scss']
// })
// export class AddCourseComponent {
//   public newCourse: Course = {
//     silibus: [''] 
//   };
//   public addForm!: FormGroup;
//   categories!: Observable<Category[]>;
//   s: string[] = [];
//   learningWays: string[] = ['Zoom', 'Frontal'];
//   constructor(private router: Router, private _productService: RecipeService) { }

//   ngOnInit(): void {
//     this.categories = this._productService.getCategoriesServer();
//     this.addForm = new FormGroup({
      
//       'name': new FormControl(null, [Validators.required, Validators.minLength(5)]),
//       'categoryId': new FormControl(null, Validators.required),
//       'countLessons': new FormControl(null, Validators.required),
//       'learningWay': new FormControl(null, Validators.required),
//       'beginningDate': new FormControl(null, Validators.required),
//       'image': new FormControl(null, Validators.required),
//       'silibus': new FormControl(null, Validators.required),
//       'speacherId': new FormControl(null, Validators.required)
//     });
//   }

//   addSilibusField() {
//     this.newCourse.silibus.push('');
//     this.addForm.patchValue({ 'silibus': this.newCourse.silibus }); // עדכון ערך הפורם בהתאם לשינוי במערך
//   }

//   removeSilibusField(index: number) {
//     this.newCourse.silibus.splice(index, 1);
//     this.addForm.patchValue({ 'silibus': this.newCourse.silibus }); // עדכון ערך הפורם בהתאם לשינוי במערך
//   }

//   handleSilibuInput(event: any, index: number) {
//     const value = event.target.value;
//     this.s.push(value);
//     if (value === '') {
//       this.newCourse.silibus.splice(index, 1);
//     } else {
//       if (index === this.newCourse.silibus.length - 1) {
//         this.addSilibusField();
//       }
      
//     }
//     this.addForm.patchValue({ 'silibus': this.newCourse.silibus }); // עדכון ערך הפורם בהתאם לשינוי במערך
//   }
//   editCourse(course: Course) {
//     // מילוי הטופס עם פרטי הקורס המקורי
//     this.addForm.patchValue({
//       name: course.name,
//       categoryId: course.categoryId,
//       countLessons: course.countLessons,
//       speacherId: course.speacherId,
//       learningWay: course.learningWay, // או course.learningWay תלוי באיך שהערך מובא מהשרת
//       beginningDate: course.beginningDate ? new Date(course.beginningDate) : null,
//       image: course.image,
//       silibus: course.silibus
//     });
//   }
//   saveCourse() {
//     let learningWayValue = this.addForm.get('learningWay')?.value;
//     let learningWayEnum: number;

//     if (learningWayValue === 'Zoom') {
//       learningWayEnum = 0;
//     } else {
//       learningWayEnum = 1;
//     }

//     let beginningDateValue = this.addForm.get('beginningDate')?.value;

//     let formattedBeginningDate: Date | undefined = undefined;
    
//     if (beginningDateValue !== null && typeof beginningDateValue !== 'string') {
//       formattedBeginningDate = beginningDateValue;
//     } else if (typeof beginningDateValue === 'string') {
//       formattedBeginningDate = new Date(beginningDateValue);
//     }
    
//     let course: Course = {
//       id: 0,
//       name: this.addForm.get('name')?.value,
//       categoryId: this.addForm.get('categoryId')?.value,
//       countLessons: this.addForm.get('countLessons')?.value,
//       learningWay: learningWayEnum, // שימוש בערך הממופה ל ENUM בשרת
//       beginningDate: formattedBeginningDate,
//       image: this.addForm.get('image')?.value,
//       speacherId: this.addForm.get('speacherId')?.value,
//       silibus: this.s
//     };
  
//     console.log(course);
  
//     this._productService.save(course).subscribe({
//       next: (res) => {
//         console.log(res);
//       },
//       error: (err) => {
//         console.log(err);
//       }
//     });
  
//     alert("הקורס נוסף בהצלחה");
//     window.location.reload();
//     this.router.navigate(['/course']);
//   }
// }








// import { Component, OnInit } from '@angular/core';
// import { Course } from '../../Course.model';
// import { Router } from '@angular/router';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { RecipeService } from '../../course.service';
// import { Category } from '../../Category.model';
// import { Observable } from 'rxjs';
// import Swal from 'sweetalert2';
// import { format, parse } from 'date-fns';

// @Component({
//   selector: 'app-add-course',
//   templateUrl: './add-course.component.html',
//   styleUrls: ['./add-course.component.scss']
// })
// export class AddCourseComponent implements OnInit {
//   public course: Course = {
//     silibus: ['']
//   };
//   public addForm!: FormGroup;
//   public categories!: Observable<Category[]>;
//   s: string[] = [];
//   learningWays: string[] = ['Zoom', 'Frontal'];
//   newCourse!:Course;
//   constructor(private router: Router, private _productService: RecipeService) { }


//   // בפונקציה parseLocalDate
//   parseLocalDate(dateString: string): Date | undefined {
//     if (!dateString) return undefined;
  
//     const [day, month, year] = dateString.split('.').map(part => parseInt(part));
//     return new Date(year, month - 1, day);
//   }
  
//   ngOnInit(): void {
 
//       // נסיר את ההשמה הקודמת שגורמת לשגיאה
//     this.categories = this._productService.getCategoriesServer();
      
//     const name = localStorage.getItem('name') || '';
    
    
//     const categoryId = localStorage.getItem('categoryId') || '0'; // משתנה זה הינו ID של הקטגוריה
//     const countLessons = localStorage.getItem('countLessons') || '';
//     const speacherId = localStorage.getItem('speacherId') || ''; // שים לב ששמתי כאן speacherId במקום speakerId
//     const learningWay = localStorage.getItem('learningWay') || '';
//     const image = localStorage.getItem('image') || '';
//     const beginningDate = localStorage.getItem('beginningDate') || '';
//     const silibus = localStorage.getItem('silibus') || '';
  
//     // הגדרת ערך ברירת המחדל ל־'Frontal' אם הערך המוחזר מהאחסון המקומי הוא '0', ול־'Zoom' אחרת
//     const defaultLearningWay = learningWay === '1' ? 'Zoom' : learningWay === '0' ? 'Frontal' : '';
//     console.log(beginningDate);
//     // הנתונים שלך
//   function convertDateTimeToDate(dateTime: Date): Date {
//       const dateOnly = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
//       return dateOnly;
//   }
//     const dateString = beginningDate;
//     const parts = dateString.split('.'); // פיצול המחרוזת לתתי מחרוזות על פי הנקודה
//     const dateObj = new Date(+parts[2], +parts[1] - 1, +parts[0]); // יצירת אובייקט תאריך מסוג Date
//     this.course.beginningDate = dateObj;

//     const dateOnly = convertDateTimeToDate(dateObj);
//     console.log(dateOnly);
//     //DateOnly זה סוג של DATETIME
//     const dateOnly2 = new Date(dateOnly.getFullYear(), dateOnly.getMonth(), dateOnly.getDate());
//     const isoDateString = dateOnly.toISOString().split('T')[0]; // לקבל את התאריך בלבד מתוך המחרוזת בפורמט "yyyy-mm-dd"

//     // הגדרת הערכים בטופס
//     this.addForm = new FormGroup({
//       'name': new FormControl(name, [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Za-z0-9\s]+$/)]),
//       'categoryId': new FormControl(categoryId, Validators.required), // השאיפה היא שה־value של ה־FormControl יהיה ה־ID של הקטגוריה
//       'countLessons': new FormControl(countLessons, Validators.required),
//       'learningWay': new FormControl(defaultLearningWay, Validators.required),
//       'beginningDate': new FormControl(isoDateString, Validators.required), // ניתן להשתמש בתצורת התאריך שאתה משתמש בה ב-Local Storage
//       'image': new FormControl(image, Validators.required),
//       'silibus': new FormControl(silibus, Validators.required),
//       'speacherId': new FormControl(speacherId, Validators.required) // כאן גם שימוש ב-speakerId
//     });
  
//     // קביעת הערכים במשתנים של הקורס
//     this.course.name = name;
//     this.course.categoryId = +categoryId ;
//     this.course.countLessons = countLessons;
//     this.course.speacherId = +speacherId ; // המרה למספר
    
//     this.course.image = image || undefined; // אם image אינו מוגדר, השמת undefined

//     // פירוק התאריך לפורמט תאריך באמצעות date-fns
 
//     // הצגת התאריך בפורמט של "yyyy-MM-dd"


//     // המרה לאובייקט תאריך
//     this.course.silibus = JSON.parse(silibus); // המרת silibus לאובייקט מעובד מJSON
//   }
  

//   addSilibusField() {
//     this.course.silibus.push('');
//     this.addForm.patchValue({ 'silibus': this.course.silibus });
//   }

//   removeSilibusField(index: number) {
//     this.course.silibus.splice(index, 1);
//     this.addForm.patchValue({ 'silibus': this.course.silibus });
//   }

//   handleSilibuInput(event: any, index: number) {
//     const value = event.target.value;
//     this.s.push(value);
//     if (value === '') {
//       this.course.silibus.splice(index, 1);
//     } else {
//       if (index === this.course.silibus.length - 1) {
//         this.addSilibusField();
//       }
//     }
//     this.addForm.patchValue({ 'silibus': this.course.silibus });
//   }

//   saveCourse() {
//     let course: Course = {
//      id: 0,
//       name: this.addForm.get('name')?.value,
//       categoryId: this.addForm.get('categoryId')?.value,
//       countLessons: this.addForm.get('countLessons')?.value,
//       learningWay: this.addForm.get('learningWay')?.value,
//       beginningDate: this.addForm.get('beginningDate')?.value,
//       image: this.addForm.get('image')?.value,
//       speacherId: this.addForm.get('speacherId')?.value,
//       silibus: this.addForm.get('silibus')?.value
//     };

//     this.saveToLocalStorage(course,this.addForm);
//     console.log(course);

//     this._productService.save(course).subscribe({
//       next: (res) => {
//         console.log(res);
//         Swal.fire({
//           icon: 'success',
//           title: 'הקורס נוסף בהצלחה!',
//           text: 'כעת תוכלו לראות את הקורס ברשימת הקורסים',
//           confirmButtonText: 'אישור'
//         });
//         this.router.navigate(['/course']);
//       },
//       error: (err) => {
//         console.log(err);
//       }
//     });
//   }

//   saveToLocalStorage(course: Course, form: FormGroup) {
    
//     localStorage.removeItem('name');
//     localStorage.removeItem('categoryId');
//     localStorage.removeItem('countLessons');
//     // localStorage.removeItem('speakerId');
//     localStorage.removeItem('speacherId');
//     localStorage.removeItem('learningWay');
//     localStorage.removeItem('image');
//     localStorage.removeItem('beginningDate');
//     localStorage.removeItem('silibus'); // מחיקת המערך הקיים

//     // מחיקת המפתח גם אם המערך הוא ריק
//     localStorage.removeItem('silibus'); 
//     this.course.silibus = [];
   
//     // מחיקת נתונים מהטופס
//     form.reset();
//     this.router.navigate(['/course']);
//   }
// }