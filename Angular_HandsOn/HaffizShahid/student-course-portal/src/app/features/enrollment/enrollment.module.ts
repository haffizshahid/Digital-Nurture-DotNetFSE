import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentRoutingModule } from './enrollment-routing.module';

// Hands-On 7 Task 2 Step 73: EnrollmentModule feature module for lazy loading
@NgModule({
  imports: [
    CommonModule,
    EnrollmentRoutingModule
  ]
})
export class EnrollmentModule {}
