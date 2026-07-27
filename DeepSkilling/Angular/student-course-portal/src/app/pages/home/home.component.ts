import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CourseSummaryWidgetComponent } from '../../components/course-summary/course-summary-widget.component';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CourseSummaryWidgetComponent,
    NotificationComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Step 11: String interpolation property
  public portalName: string = 'Student Course Portal';

  // Step 12: Property binding property for disabled state
  public isPortalActive: boolean = true;

  // Step 13: Event binding message
  public message: string = '';

  // Step 14: Two-way binding property
  public searchTerm: string = '';

  // Stats row values (Hands-On 1 Step 8)
  public availableCoursesCount: number = 12;
  public enrolledCount: number = 3;
  public gpa: number = 3.8;

  constructor(private courseService: CourseService) {}

  // Step 16: ngOnInit lifecycle hook
  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    const courses = this.courseService.getCoursesSync();
    if (courses && courses.length > 0) {
      this.availableCoursesCount = courses.length;
    }
  }

  // Step 17: ngOnDestroy lifecycle hook
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  // Step 13: Event binding click handler
  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  /*
   * Hands-On 2 Step 15 Explanation Comment:
   * ----------------------------------------------------------------------------------
   * Difference between [property] binding and [(ngModel)] two-way binding:
   *
   * 1. [property] binding (e.g. [disabled]="!isPortalActive"):
   *    Is a ONE-WAY binding from Component -> DOM. Data flows strictly from the component's
   *    TypeScript property to update the target HTML element's DOM property.
   *
   * 2. [(ngModel)] binding (e.g. [(ngModel)]="searchTerm"):
   *    Is a TWO-WAY binding (DOM <-> Component). It combines property binding [ngModel] and
   *    event binding (ngModelChange). Any user input in the DOM updates the component property,
   *    and any programmatic change to the property updates the DOM value automatically.
   * ----------------------------------------------------------------------------------
   */
}
