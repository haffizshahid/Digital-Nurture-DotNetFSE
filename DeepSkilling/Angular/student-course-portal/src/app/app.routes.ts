import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { EnrollmentFormComponent } from './pages/enrollment-form/enrollment-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

// Hands-On 7 Task 1 & Task 2 Route Definitions
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'courses',
    component: CourseListComponent
  },
  {
    path: 'courses/:id',
    component: CourseDetailComponent
  },
  // Step 76: Apply authGuard to profile route
  {
    path: 'profile',
    component: StudentProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'enroll-template',
    component: EnrollmentFormComponent
  },
  // Step 73: Lazy loading feature module for enrollment
  {
    path: 'enroll',
    loadChildren: () => import('./features/enrollment/enrollment.module').then(m => m.EnrollmentModule)
  },
  // Step 68: Wildcard route must always be the last route
  {
    path: '**',
    component: NotFoundComponent
  }
];
