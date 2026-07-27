import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// Hands-On 8 Task 3 Step 90: Error Handler Interceptor
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Unauthorized request - redirecting to home');
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('Server error (500): Global error handler intercepted request');
      }
      return throwError(() => error);
    })
  );
};
