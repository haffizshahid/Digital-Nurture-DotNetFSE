import { HttpInterceptorFn } from '@angular/common/http';

// Hands-On 8 Task 3 Step 88: Auth Interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone request and add Authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-token-12345'
    }
  });
  return next(authReq);
};
