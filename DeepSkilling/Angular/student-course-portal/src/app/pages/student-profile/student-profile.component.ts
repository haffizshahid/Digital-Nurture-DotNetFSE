import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment.service';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, CreditLabelPipe],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  public studentName: string = 'Shahed (Full Stack Student)';
  public studentEmail: string = 'shahed@example.com';
  public enrolledCourses: Course[] = [];

  // Step 66: Inject EnrollmentService to get enrolled courses
  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.enrolledCourses = this.enrollmentService.getEnrolledCourses();
  }

  unenroll(courseId: number): void {
    this.enrollmentService.unenroll(courseId);
    this.enrolledCourses = this.enrollmentService.getEnrolledCourses();
  }
}
