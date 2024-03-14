// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { RecipeService } from '../course.service';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
//   standalone: true
// })
// export class LoginComponent {
//   constructor(
//     private router: Router,
//     private userService: UserService // ניתן להשתמש בשירות UserService לביצוע בדיקת המשתמש בסרבר
//   ) { }

//   handleLogin(username: string, password: string) {
//     const storedUsername = localStorage.getItem('username');
//     const storedPassword = localStorage.getItem('password');
//     this.userService.getUsers().subscribe({
//       next: (users) => {
//         const userExists = users.find(
//           (user) => user.name === username && user.password === password
//         );
  
//         if (userExists) {
//           console.log('משתמש קיים:', userExists);
//           console.log(localStorage.getItem('id'));
//           console.log('משתמשים בלוקלסטורייג:before', localStorage.getItem('username'));
//           localStorage.setItem('username', username); // שמירת שם המשתמש ב-LocalStorage
//           localStorage.setItem('password', password);
//           // localStorage.setItem('id', userExists.id.toString()); // שמירת ה־id ב־LocalStorage
//           console.log('משתמשים בלוקלסטורייג:after', localStorage.getItem('username'));
//           alert('hello welcome ' + username);
//           this.router.navigate(['/course']);
//         } else {
//           const nameServer = users.find((user) => user.name === username);
//           const passwordServer = users.find((user) => user.password === password);
  
//           if (nameServer && !passwordServer) {
//             console.log('משתמשים בלוקלסטורייג:', localStorage.getItem('username'));
//             alert('הסיסמה אינה נכונה');
//           } else {
//             console.log('משתמשים בלוקלסטורייג:before', localStorage.getItem('username'));
//             localStorage.setItem('username', username); // שמירת שם המשתמש ב-LocalStorage
//             localStorage.setItem('password', password); // שמירת הסיסמה ב-LocalStorage
//             console.log('משתמשים בלוקלסטורייג:after', localStorage.getItem('username'));
//             this.router.navigate(['/register']);
//           }
//         }
//       },
//       error: (error) => {
//         console.error('Error fetching users from server:', error);
//         alert('אירעה שגיאה בבדיקת המשתמש בסרבר');
//       },
//     });
//   }
  

// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true
})
export class LoginComponent {
  constructor(
    private router: Router,
    private userService: UserService // ניתן להשתמש בשירות UserService לביצוע בדיקת המשתמש בסרבר
    
  ) { }
handleLogin(username: string, password: string) {

  this.userService.getUsers().subscribe({
    next: (users) => {
      const userExists = users.find(
        (user) => user.name === username && user.password === password
      );      
      
      if (userExists) {
        let d=String(userExists?.id); 
        localStorage.setItem('username', username); // שמירת שם המשתמש ב-LocalStorage
        localStorage.setItem('password', password);
        localStorage.setItem('id',d )
        console.log("id!!!!!"+localStorage.getItem('id'));
        
        

        setTimeout(() => {
          
          Swal.fire({
            icon: 'success',
            title: 'Welcome ' + username,
            text: 'תודה שנכנסת לאתר שלנו.'
          });
          this.router.navigate(['/course']);
        }, 100); // מחכה 100 מילי-שניות לפני הצגת האזהרה והניווד לעמוד הבא
      } else {
        const nameServer = users.find((user) => user.name === username);
        const passwordServer = users.find((user) => user.password === password);

        if (nameServer && !passwordServer) {
          console.log('משתמשים בלוקלסטורייג:', localStorage.getItem('username'));
          Swal.fire({
            icon: 'error',
            title: 'סיסמה שגויה',
            text: 'אנא נסה שוב עם סיסמה נכונה.'
          });
        } else {
          console.log('משתמשים בלוקלסטורייג:before', localStorage.getItem('username'));
          localStorage.setItem('username', username); // שמירת שם המשתמש ב-LocalStorage
          localStorage.setItem('password', password); // שמירת הסיסמה ב-LocalStorage
          console.log('משתמשים בלוקלסטורייג:after', localStorage.getItem('username'));
          this.router.navigate(['/register']);
        }
      }
    },
    error: (error) => {
      console.error('Error fetching users from server:', error);
      alert('אירעה שגיאה בבדיקת המשתמש בסרבר');
    },
  });
}

}


