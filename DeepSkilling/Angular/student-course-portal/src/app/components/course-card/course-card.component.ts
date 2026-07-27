import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Course } from '../../models/course.model';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnChanges {
  // Step 20: @Input() course
  @Input() course: Course | undefined;
  @Input() isEnrolled: boolean = false;

  // Step 21: @Output() enrollRequested EventEmitter
  @Output() enrollRequested = new EventEmitter<number>();

  // Step 31: isExpanded property to toggle card height
  public isExpanded: boolean = false;

  constructor(private enrollmentService: EnrollmentService) {}

  // Step 18: ngOnChanges logging previous and current value of input
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('CourseCardComponent ngOnChanges:', {
        previous: changes['course'].previousValue,
        current: changes['course'].currentValue
      });
    }
  }

  // Step 32: Getter for cardClasses
  get cardClasses(): { [key: string]: boolean } {
    return {
      'card--enrolled': this.isEnrolled || (!!this.course && this.enrollmentService.isEnrolled(this.course.id)),
      'card--full': !!(this.course && this.course.credits >= 4),
      'expanded': this.isExpanded
    };
  }

  // Step 30: [ngStyle] getter for dynamic left border color based on gradeStatus
  get borderStyle(): { [key: string]: string } {
    const status = this.course?.gradeStatus;
    let color = '#94a3b8'; // grey for pending
    if (status === 'passed') color = '#10b981'; // green
    if (status === 'failed') color = '#ef4444'; // red

    return { 'border-left': `5px solid ${color}` };
  }

  onEnrollClick(): void {
    if (this.course) {
      if (this.enrollmentService.isEnrolled(this.course.id)) {
        this.enrollmentService.unenroll(this.course.id);
      } else {
        this.enrollmentService.enroll(this.course.id);
      }
      this.enrollRequested.emit(this.course.id);
    }
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
