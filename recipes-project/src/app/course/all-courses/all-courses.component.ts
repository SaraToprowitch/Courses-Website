

// // import { Component, OnInit } from '@angular/core';
// // import { RecipeService } from '../../recipe.service';
// // import { Course } from '../../Course.model';
// // import { CourseDetailsComponent } from '../course-details/course-details.component';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-all-courses',
// //   templateUrl: './all-courses.component.html',
// //   styleUrls: ['./all-courses.component.scss'],
// // })
// // export class AllCoursesComponent implements OnInit {
// //   public productsList?: Course[];
// //   public isAdd!:boolean;
// //   public selectedCourse!:Course;
// //   constructor( private _productService: RecipeService,private router:Router) { }

// //   ngOnInit(): void {
// //     this._productService.getProductFromServer().subscribe({
// //       next: (res: Course[]) => {
// //         this.productsList = res;
// //       }
// //     });
// //   }
// //   isAddFunc():void{
// //     this.isAdd= !this.isAdd;
// //   }
// //   public showDetails(c: Course) {
// //     this.selectedCourse = c;
// //     console.log(c);
    
// //     this.router.navigate(["/course/courseDetails", c.id])
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { RecipeService } from '../../course.service';
// import { Course } from '../../Course.model';
// import { Category } from '../../Category.model';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-all-courses',
//   templateUrl: './all-courses.component.html',
//   styleUrls: ['./all-courses.component.scss'],
// })
// export class AllCoursesComponent implements OnInit {
//   public productsList!: Course[]; // Ensure productsList is initialized
//   public allCourses!: Course[]; // All courses for the select
//   public categories!: Category[];
//   public selectedCourse!:Course;
//   public filteredProductsList!: Course[]; // Ensure filteredProductsList is initialized
//   public filters: { [key: string]: string } = {};
//   public isAdd!:boolean;
//   constructor(private _productService: RecipeService,private route:Router) {}

//   ngOnInit(): void {
//     this._productService.getProductFromServer().subscribe({
//       next: (res: Course[]) => {
//         this.productsList = res;
//         this.filteredProductsList = this.productsList; // Initialize filtered
//         this.allCourses = res; // Initialize all courses for the select
//       }
//     });
//     this._productService.getCategoriesServer().subscribe({
//       next: (res: Category[]) => {
//         this.categories = res;
//       }
//     });
//   }
//   showDetails(c: Course) {
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//       // המשתמש קיים ב-LocalStorage
//       this.selectedCourse = c;
//       console.log(c);
//       this.route.navigate(["/course/courseDetails", c.id]);
//     } else {
//       // המשתמש לא קיים ב-LocalStorage
//       Swal.fire({
//         icon: 'error',
//         title: 'עליך להירשם',
//         text: 'על מנת לראות את פרטי הקורס',
//         confirmButtonText: 'אישור'
//       });
//       //alert('עליך להירשם כדי לראות את פרטי הקורס');
//     }
//   }
//   filterCourses(filterType: string, event: any): void {
//     const value = event.target.value;
//     this.filters[filterType] = value;
//     this.applyFilters();
//     console.log(this.filteredProductsList); // הוסף שורה זו לבדיקת הפלט
//   }
//   isAddFunc():void{
//         this.isAdd= !this.isAdd;
//       }
//   applyFilters(): void {
//     this.filteredProductsList = this.productsList.filter(course => {
//       return Object.keys(this.filters).every(key => {
//         const value = this.filters[key].toLowerCase();
//         switch (key) {
//           case 'courseName':
//             return course.name && course.name.toLowerCase().includes(value);
//           case 'learningWay':
//             return course.learningWay?.toString() === value;
//           case 'categoryId':
//             return course.categoryId?.toString() === value;
//           default:
//             return true;
//         }
//       });
//     });
//   }
  
// }

// import { Component, OnInit } from '@angular/core';
// import { RecipeService } from '../../course.service';
// import { Course } from '../../Course.model';
// import { Category } from '../../Category.model';
// import Swal from 'sweetalert2';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-all-courses',
//   templateUrl: './all-courses.component.html',
//   styleUrls: ['./all-courses.component.scss'],
// })
// export class AllCoursesComponent implements OnInit {
//   public productsList!: Course[]; // Ensure productsList is initialized
//   public allCourses!: Course[]; // All courses for the select
//   public categories!: Category[];
//   public filteredProductsList!: Course[]; // Ensure filteredProductsList is initialized
//   public filters: { [key: string]: string } = {};
//   public isAdd!:boolean;
//   public selectedCourse!: Course;

//   constructor(private _productService: RecipeService,private route:Router) {}

//   ngOnInit(): void {
//     this._productService.getProductFromServer().subscribe({
//       next: (res: Course[]) => {
//         this.productsList = res;
//         this.filteredProductsList = this.productsList; // Initialize filtered
//         this.allCourses = res; // Initialize all courses for the select
//       }
//     });
//     this._productService.getCategoriesServer().subscribe({
//       next: (res: Category[]) => {
//         this.categories = res;
//       }
//     });
//   }

//   filterCourses(filterType: string, event: any): void {
//     const value = event.target.value;
//     this.filters[filterType] = value;
//     this.applyFilters();
//     console.log(this.filteredProductsList); // הוסף שורה זו לבדיקת הפלט
//   }
//   isAddFunc():void{
//         this.isAdd= !this.isAdd;
//       }
//       showDetails(c: Course) {
//         const storedUsername = localStorage.getItem('username');
//         if (storedUsername) {
//           // המשתמש קיים ב-LocalStorage
//           this.selectedCourse = c;
//           console.log(c);
//           this.route.navigate(["/course/courseDetails", c.id]);
//         } else {
//           // המשתמש לא קיים ב-LocalStorage
//           Swal.fire({
//             icon: 'error',
//             title: 'עליך להירשם',
//             text: 'על מנת לראות את פרטי הקורס',
//             confirmButtonText: 'אישור'
//           });
//           //alert('עליך להירשם כדי לראות את פרטי הקורס');
//         }
//       }
//   applyFilters(): void {
//     this.filteredProductsList = this.productsList.filter(course => {
//       return Object.keys(this.filters).every(key => {
//         const value = this.filters[key].toLowerCase();
//         switch (key) {
//           case 'courseName':
//             return course.name && course.name.toLowerCase() === value.toLowerCase();
//           case 'learningWay':
//             return course.learningWay?.toString() === value;
//           case 'categoryId':
//             return course.categoryId?.toString() === value;
//           default:
//             return true;
//         }
//       });
//     });
//   }
  
// }
import { Component, OnInit } from '@angular/core';
import { Course } from '../../Course.model';
import { Category } from '../../Category.model';
import { RecipeService } from '../../course.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss'],
})
export class AllCoursesComponent implements OnInit {
  public productsList!: Course[]; // Ensure productsList is initialized
  public allCourses!: Course[]; // All courses for the select
  public categories!: Category[];
  public filteredProductsList!: Course[]; // Ensure filteredProductsList is initialized
  public filters: { [key: string]: string } = {};
  public isAdd!:boolean;
  public selectedCourse!: Course;

  constructor(private _productService: RecipeService,private route:Router) {}

  ngOnInit(): void {
    this._productService.getCoursesFromServer().subscribe({
      next: (res: Course[]) => {
        this.productsList = res;
        this.filteredProductsList = this.productsList; // Initialize filtered
        this.allCourses = res; // Initialize all courses for the select
      }
    });
    this._productService.getCategoriesServer().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
      }
    });
  }

  filterCourses(filterType: string, event: any): void {
    const value = event.target.value;
    this.filters[filterType] = value;
    if (value === '') {
      // אם הערך הנבחר הוא ריק, אז אין צורך בפילטר
      delete this.filters[filterType]; // מחיקת הפילטר מהמערך
    }
    this.applyFilters();
    console.log(this.filteredProductsList);
  }
  isAddFunc():void{
        this.isAdd= !this.isAdd;
      }
      showDetails(c: Course) {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          // המשתמש קיים ב-LocalStorage
          this.selectedCourse = c;
          console.log(c);
          this.route.navigate(["/course/courseDetails", c.id]);
        } else {
          // המשתמש לא קיים ב-LocalStorage
          Swal.fire({
            icon: 'error',
            title: 'עליך להירשם',
            text: 'על מנת לראות את פרטי הקורס',
            confirmButtonText: 'אישור'
          });
          //alert('עליך להירשם כדי לראות את פרטי הקורס');
        }
      }
  applyFilters(): void {
    this.filteredProductsList = this.productsList.filter(course => {
      return Object.keys(this.filters).every(key => {
        const value = this.filters[key].toLowerCase();
        switch (key) {
          case 'courseName':
            return course.name && course.name.toLowerCase().includes(value);
          case 'learningWay':
            return course.learningWay?.toString() === value;
          case 'categoryId':
            return course.categoryId?.toString() === value;
          default:
            return true;
        }
      });
    });
  }
  
}
