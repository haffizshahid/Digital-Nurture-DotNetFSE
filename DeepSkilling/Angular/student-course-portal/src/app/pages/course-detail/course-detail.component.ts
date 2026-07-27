import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Course, Student } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CreditLabelPipe],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  public course: Course | undefined;
  public enrolledStudents$: Observable<Student[]> | undefined;
  public courseId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    // Hands-On 7 Step 69: Read route parameter :id using ActivatedRoute snapshot
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.courseId = +idParam;
      this.courseService.getCourseById(this.courseId).subscribe(course => {
        this.course = course;
      });

      /*
       * Hands-On 8 Step 87 Explanation Comment:
       * ----------------------------------------------------------------------------------
       * switchMap Operator Explanation:
       * switchMap chains two Observables together (Route params -> Enrolled Students HTTP call).
       * Crucially, whenever a new courseId arrives on the source Observable, switchMap automatically
       * cancels the previous inner HTTP request if it hasn't completed yet, preventing race
       * conditions and out-of-order responses.
       * ----------------------------------------------------------------------------------
       */
      this.enrolledStudents$ = this.route.paramMap.pipe(
        switchMap(params => {
          const id = Number(params.get('id'));
          return id ? this.enrollmentService.getStudentsByCourse(id) : of([]);
        })
      );
    }
  }
}
