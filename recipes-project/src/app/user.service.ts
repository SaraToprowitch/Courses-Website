import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User.model';
import { Lecturer } from '../../Lecturer.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>('api/User',user);
  }
  public delUser(id: number): Observable<User> {
    return this.http.delete<User>(`https://localhost:7205/api/User/${id}`);
  }
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:7205/api/User');
  }
  public getLecturer(): Observable<Lecturer[]> {
    return this.http.get<Lecturer[]>('https://localhost:7205/api/Lecturer');
  }
  public addLecturer(lecturer: Lecturer): Observable<Lecturer> {
    return this.http.post<Lecturer>('api/Lecturer',lecturer);
  }
  public delLecturer(id: number): Observable<Lecturer> {
    return this.http.delete<Lecturer>(`https://localhost:7205/api/Lecturer/${id}`);
  }
 
}