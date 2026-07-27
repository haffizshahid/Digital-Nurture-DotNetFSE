import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { courseReducer } from './store/course/course.reducer';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';
import { CourseEffects } from './store/course/course.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Hands-On 8 Step 78 & 88: Registered HTTP Interceptors (auth, error-handler, loading)
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        errorHandlerInterceptor,
        loadingInterceptor
      ])
    ),
    // Hands-On 9 Step 92 & 95: NgRx Store registration
    provideStore({
      course: courseReducer,
      enrollment: enrollmentReducer
    }),
    // Hands-On 9 Step 97: NgRx Effects registration
    provideEffects([CourseEffects]),
    // Hands-On 9 Step 92: Redux DevTools instrument registration
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
