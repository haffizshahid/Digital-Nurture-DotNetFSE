import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseService } from '../../services/course.service';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  // Step 25: isLoading boolean property for structural directive demo
  public isLoading: boolean = true;

  // Step 23: selectedCourseId property
  public selectedCourseId: number | null = null;
  public searchTerm: string = '';
  public errorMessage: string | null = null;

  // Hands-On 9: NgRx Observables
  public courses$: Observable<Course[]>;
  public ngrxLoading$: Observable<boolean>;
  public ngrxError$: Observable<string | null>;
  public enrolledIds$: Observable<number[]>;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.ngrxLoading$ = this.store.select(selectCoursesLoading);
    this.ngrxError$ = this.store.select(selectCoursesError);
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  ngOnInit(): void {
    // Step 96: Dispatch load action on ngOnInit
    this.store.dispatch(loadCourses());

    // Step 25: Simulate loading delay for structural directive demo
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    // Step 71: Read search query parameter from URL
    const searchParam = this.route.snapshot.queryParamMap.get('search');
    if (searchParam) {
      this.searchTerm = searchParam;
    }
  }

  /*
   * Hands-On 3 Step 26 Explanation Comment:
   * ----------------------------------------------------------------------------------
   * trackBy performance optimization:
   * Without trackBy, when an array changes, Angular removes and re-creates all DOM elements
   * in the *ngFor loop. Using trackBy gives Angular a unique identifier (course.id) to track
   * items, so it only updates DOM elements that changed, improving performance significantly.
   * ----------------------------------------------------------------------------------
   */
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  // Step 23: onEnroll event handler
  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  // Step 71: Update URL query parameters on search input change
  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;
    this.router.navigate(['/courses'], {
      queryParams: { search: value || null },
      queryParamsHandling: 'merge'
    });
  }
}
