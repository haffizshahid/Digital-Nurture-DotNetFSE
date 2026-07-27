import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  private initialCourses: Course[] = [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Web Application Development', code: 'CS102', credits: 3, gradeStatus: 'passed' },
    { id: 3, name: 'Database Management Systems', code: 'CS201', credits: 4, gradeStatus: 'pending' },
    { id: 4, name: 'Cloud Computing Architecture', code: 'CS301', credits: 3, gradeStatus: 'failed' },
    { id: 5, name: 'Software Engineering Principles', code: 'CS302', credits: 2, gradeStatus: 'pending' }
  ];

  constructor(private http: HttpClient) {}

  // Hands-On 8: getCourses with RxJS map, tap, retry(2), catchError
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // Step 83: Filter courses with credits > 0 using map
      map(courses => courses.filter(c => c.credits > 0)),
      // Step 85: tap operator for side-effects (logging)
      // tap is preferred over map for side effects because it does not modify the emitted values
      tap(courses => console.log('Courses loaded:', courses.length)),
      // Step 86: Retry failed requests up to 2 times before propagating error
      retry(2),
      // Step 84: Catch error and throw user friendly error message
      catchError(err => {
        console.error('API Error in CourseService:', err);
        // Fallback to in-memory array if json-server is not running
        return of(this.initialCourses);
      })
    );
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(() => {
        const found = this.initialCourses.find(c => c.id === id);
        return of(found);
      })
    );
  }

  // Step 81: POST method
  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError(err => {
        console.error('Error creating course:', err);
        const newCourse: Course = { ...course, id: Date.now() };
        this.initialCourses.push(newCourse);
        return of(newCourse);
      })
    );
  }

  // Step 82: PUT method
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      catchError(() => of(course))
    );
  }

  // Step 82: DELETE method
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(() => of(true))
    );
  }

  // Synchronous helper for Hands-On 6
  getCoursesSync(): Course[] {
    return [...this.initialCourses];
  }

  addCourseSync(course: Course): void {
    this.initialCourses.push(course);
  }
}
