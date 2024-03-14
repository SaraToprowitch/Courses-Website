import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
})
export class LogoutComponent {
  constructor(private router: Router,private userService: UserService) { }
  closeAccount(username: string, password: string){
    // קרא לפונקציה delUser מהסרוויס userService
    this.userService.getUsers().subscribe({
      next: (users) => {
        const delUser = users.find(
          (user) => user.name === username && user.password === password
        );     
        let d=Number(delUser?.id); 
         this.userService.delUser(d).subscribe(
      () => {
      if(localStorage.getItem('course')!=null){//it is lecturer
        this.userService.delLecturer(d).subscribe(
          () => {
          },
        (error) => {
          console.error('Error deleting lecturer:', error);
        }
        );
      }
        // טיפול במחיקה הוצלחה
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('course');
        this.router.navigate(['/login']);
      },
      (error) => {
        // טיפול בשגיאה במהלך המחיקה
        console.error('Error deleting user: ', error);
        // כאן אתה יכול להוסיף התראה או לטפל בשגיאה בדרך אחרת
      }
    );
  }});
  }
  handleLogout() {

     // טיפול במחיקה הוצלחה
     localStorage.removeItem('username');
     localStorage.removeItem('password');
     localStorage.removeItem('course');
     this.router.navigate(['/login']);
    
  }
}
