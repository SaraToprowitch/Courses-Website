
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import "primeng/resources/themes/lara-light-blue/theme.css";
import "primeng/resources/primeng.css";
import "primeicons/primeicons.css";
import { Router } from '@angular/router';
import { CourseRoutingModule } from '../course/course-routing.module';
import { CourseModule } from '../course/course.module';
@Component({
    standalone:true,
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    imports: [
        CommonModule,
        TabMenuModule,
        BadgeModule,
        CourseModule
      ],
      styleUrl:'./top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
    items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;
    constructor(private router: Router) { }
    ngOnInit() {
        this.items = [
          { label: 'login', icon: 'pi pi-fw pi-sign-in' },
          { label: 'register', icon: 'pi pi-fw pi-user-plus' },
          { label: 'all Courses', icon: 'pi pi-fw pi-list' },
          { label: 'add Course', icon: 'pi pi-fw pi-plus-circle' },
          { label: 'logout', icon: 'pi pi-fw pi-sign-out' }
        ];
        this.activeItem = this.items[0];
      }
    
    onMenuItemClick(item: MenuItem) {
        if (item.label === 'all Courses') {
            this.router.navigate(['/course/allCourses']);
        }
        else if (item.label === 'add Course') {
            this.router.navigate(['/course/addCourse',-1]);
        } else {
            this.router.navigate([item.label?.toLowerCase()]);
        }
        const savedAddForm = localStorage.getItem('addForm');
     
    }
}