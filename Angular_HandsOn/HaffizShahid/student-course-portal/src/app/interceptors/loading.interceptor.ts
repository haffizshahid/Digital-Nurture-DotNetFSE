import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

// Hands-On 8 Task 3 Step 91: Loading Interceptor
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  loadingService.show();

  return next(req).pipe(
    // finalize in RxJS runs whether the Observable completes or errors — ideal place to hide loading spinner
    finalize(() => {
      loadingService.hide();
    })
  );
};
