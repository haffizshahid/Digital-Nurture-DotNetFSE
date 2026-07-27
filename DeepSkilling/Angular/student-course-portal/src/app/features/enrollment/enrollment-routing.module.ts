import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveEnrollmentFormComponent } from '../../pages/reactive-enrollment-form/reactive-enrollment-form.component';
import { EnrollmentFormComponent } from '../../pages/enrollment-form/enrollment-form.component';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';

// Hands-On 7 Task 2 Step 73: Routes inside lazy loaded EnrollmentModule
const routes: Routes = [
  {
    path: '',
    component: ReactiveEnrollmentFormComponent,
    canDeactivate: [unsavedChangesGuard]
  },
  {
    path: 'template',
    component: EnrollmentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule {}
