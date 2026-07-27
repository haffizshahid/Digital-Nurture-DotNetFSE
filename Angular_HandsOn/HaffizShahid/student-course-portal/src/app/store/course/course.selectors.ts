import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

// Selectors are memoised — they only recompute when their input selectors change (Step 95)
export const selectCourseState = createFeatureSelector<CourseState>('course');

export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state?.courses || []
);

export const selectCoursesLoading = createSelector(
  selectCourseState,
  (state: CourseState) => state?.loading || false
);

export const selectCoursesError = createSelector(
  selectCourseState,
  (state: CourseState) => state?.error || null
);
