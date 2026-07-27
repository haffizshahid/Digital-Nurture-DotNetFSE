import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import * as CourseActions from './course.actions';

@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  // Hands-On 9 Task 2 Step 97: loadCourses$ effect
  // Effects are the only place in NgRx where side effects (HTTP calls) should happen
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map(courses => CourseActions.loadCoursesSuccess({ courses })),
          catchError(error =>
            of(CourseActions.loadCoursesFailure({ error: error.message || 'Failed to load courses' }))
          )
        )
      )
    )
  );

  addCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.addCourse),
      switchMap(action =>
        this.courseService.createCourse(action.course).pipe(
          map(course => CourseActions.addCourseSuccess({ course })),
          catchError(error =>
            of(CourseActions.loadCoursesFailure({ error: error.message || 'Failed to add course' }))
          )
        )
      )
    )
  );
}
