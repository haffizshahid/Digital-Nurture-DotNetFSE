import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

// Hands-On 10 Task 2: Testing a Service with HttpClientTesting
describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Web Dev', code: 'CS102', credits: 3, gradeStatus: 'passed' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Step 110 Hint: verify no outstanding HTTP requests remain
    httpMock.verify();
  });

  // Step 107: Test getCourses()
  it('should fetch all courses via GET HTTP request', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  // Step 108: Test error handling
  it('should handle HTTP error and return fallback array', () => {
    service.getCourses().subscribe(courses => {
      expect(courses).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    // Flush 500 server error response
    req.flush('500 Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
