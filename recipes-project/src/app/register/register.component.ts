import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [NgIf,ReactiveFormsModule],
  providers: [CommonModule]

})
export class RegisterComponent implements OnInit {
  static lastId: number = 4; // Static variable to keep track of last used ID

  registerForm!: FormGroup;

  id!:number;
  username!: string;
  password!: string;
  isLecturer!: boolean;
  email!: string;
  address!: string;
  course!: string;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    localStorage.removeItem('course');//בשביל מקרה שלא ישארו נתונים של קורס ממשתמש קודם ואז ייקרא מרצה
    this.username = localStorage.getItem('username') || '';
    this.password = localStorage.getItem('password') || '';
      this.registerForm = new FormGroup({
        'username': new FormControl(this.username),
        'email': new FormControl(this.email),
        'address': new FormControl(this.address),
        'password': new FormControl(this.password),
        'isLecturer': new FormControl(false),
        'course': new FormControl(this.course)
      });


  }
  IsLecturer(): void {
    this.isLecturer = true;
  }
  
  submitForm(): void {
    const newUser: User = {
      id: RegisterComponent.lastId++, // Incrementing the static ID variable
      name: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      address: this.registerForm.get('address')?.value,
      email: this.registerForm.get('email')?.value
    }
    console.log(newUser);
        // localStorage.setItem('id', this.id); 
        localStorage.setItem('username', this.registerForm.get('name')?.value); 
        localStorage.setItem('password', this.registerForm.get('password')?.value);
        localStorage.setItem('course', this.registerForm.get('course')?.value);
        if (this.isLecturer) {
          localStorage.setItem('course', this.registerForm.get('course')?.value);
        }
        console.log(newUser);

    this.userService.addUser(newUser).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Welcome ' + newUser.name,
          text: 'תודה שנרשמת לאתר שלנו.'
        });        this.router.navigate(['/course']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
        Swal.fire({
          icon: 'error',
          text: 'אירעה שגיאה ברישום המשתמש'
        });      }
    });
    if(this.isLecturer == true)//if it is lecturer register to lecturer
    {
      this.userService.addLecturer(newUser).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Welcome speacher ' + newUser.name,
          text: 'תודה שנרשמת לאתר שלנו.'
        });         this.router.navigate(['/course']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
        alert('אירעה שגיאה ברישום המרצה');
      }
    });
    }
    
  }
}
// import { CommonModule, NgIf } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { User } from '../User.model';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { UserService } from '../user.service';

// ;

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   templateUrl: './register.component.html',
//   //styleUrls: ['./register.component.scss'],
//   imports: [NgIf,ReactiveFormsModule],
//   providers: [CommonModule]

// })
// export class RegisterComponent implements OnInit {
//   registerForm!: FormGroup;

//   id!:number;
//   username!: string;
//   password!: string;
//   isLecturer!: boolean;
//   email!: string;
//   address!: string;
//   course!: string;
//   constructor(private router: Router, private userService: UserService) { }

//   ngOnInit(): void {
//     this.username = localStorage.getItem('username') || '';
//     this.password = localStorage.getItem('password') || '';
//       this.registerForm = new FormGroup({
//         'username': new FormControl(this.username),
//         'email': new FormControl(this.email),
//         'address': new FormControl(this.address),
//         'password': new FormControl(this.password),
//         'isLecturer': new FormControl(false),
//         'course': new FormControl(this.course)
//       });


//   }
//   IsLecturer(): void {
//     this.isLecturer = true;
//   }
  
//   submitForm(): void {
//     alert("0");
//     const newUser: User = {
//       id:4,
//       name: this.registerForm.get('username')?.value,
//       password: this.registerForm.get('password')?.value,
//       address: this.registerForm.get('address')?.value,
//       email: this.registerForm.get('email')?.value
//     }
//     console.log(newUser);
//         localStorage.setItem('username', this.registerForm.get('name')?.value); 
//         localStorage.setItem('password', this.registerForm.get('password')?.value);
//         localStorage.setItem('address', this.registerForm.get('address')?.value); 
//         localStorage.setItem('email', this.registerForm.get('email')?.value);
//         localStorage.setItem('course', this.registerForm.get('course')?.value);
//         if (this.isLecturer) {
//           localStorage.setItem('course', this.registerForm.get('course')?.value);
//         }
//         alert(localStorage.getItem('course'));
//         console.log(newUser);

//     this.userService.addUser(newUser).subscribe({
//       next: () => {
//         alert('המשתמש נרשם בהצלחה!');
//         this.router.navigate(['/course']);
//       },
//       error: (error) => {
//         console.error('Error registering user:', error);
//         alert('אירעה שגיאה ברישום המשתמש');
//       }
//     });
//   }
// }