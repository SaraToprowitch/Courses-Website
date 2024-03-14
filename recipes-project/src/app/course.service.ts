import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './Course.model';
import { Category } from './Category.model';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  public getCoursesFromServer(): Observable<Course[]> {
    return this.http.get<Course[]>('https://localhost:7205/api/Course');
  }
  public getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`https://localhost:7205/api/Course/${id}`);
  }
  public getCategoriesServer(): Observable<Category[]> {
    return this.http.get<Category[]>('https://localhost:7205/api/Category');
  }
  
  public getProductById(id: number): Observable<Course> {
    return this.http.get<Course>(`https://localhost:7205/api/Course/${id}`);
  }

  public save(course: Course): Observable<Course> {
    return this.http.post<Course>('/api/Course', course);
  }
  public editCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`https://localhost:7205/api/Course/${course.id}`, course);
  }
}