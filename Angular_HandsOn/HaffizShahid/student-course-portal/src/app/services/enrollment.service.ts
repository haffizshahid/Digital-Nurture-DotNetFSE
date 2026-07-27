import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course, Student } from '../models/course.model';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [1, 2];
  private apiUrl = 'http://localhost:3000/students';

  // Step 64: Injecting CourseService into EnrollmentService — service-to-service injection
  constructor(
    private courseService: CourseService,
    private http: HttpClient
  ) {}

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourseIds(): number[] {
    return [...this.enrolledCourseIds];
  }

  getEnrolledCourses(): Course[] {
    const allCourses = this.courseService.getCoursesSync();
    return allCourses.filter(course => this.enrolledCourseIds.includes(course.id));
  }

  // Step 87: Fetch students by course ID (used with switchMap)
  getStudentsByCourse(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}?courseId=${courseId}`).pipe(
      catchError(() => of([
        { id: 101, name: 'John Doe', email: 'john@example.com', courseId },
        { id: 102, name: 'Jane Smith', email: 'jane@example.com', courseId }
      ]))
    );
  }
}
