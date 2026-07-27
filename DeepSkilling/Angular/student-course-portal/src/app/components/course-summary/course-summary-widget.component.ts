import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';

// Hands-On 6 Task 1 Step 62: CourseSummaryWidget confirming singleton service instance
@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-widget">
      <h4>Course Service Summary Widget</h4>
      <p>Live Course Count from Singleton Service: <strong>{{ courseCount }}</strong></p>
    </div>
  `,
  styles: [`
    .summary-widget {
      background: rgba(6, 182, 212, 0.1);
      border: 1px solid var(--secondary-color);
      border-radius: 8px;
      padding: 1rem;
      margin: 1rem 0;
    }
    h4 { color: var(--secondary-color); margin-bottom: 0.5rem; }
  `]
})
export class CourseSummaryWidgetComponent {
  constructor(private courseService: CourseService) {}

  get courseCount(): number {
    return this.courseService.getCoursesSync().length;
  }
}
