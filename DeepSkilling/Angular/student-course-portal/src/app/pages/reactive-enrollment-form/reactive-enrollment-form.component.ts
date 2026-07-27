import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HasUnsavedChanges } from '../../guards/unsaved-changes.guard';

// Step 53: Custom synchronous validator function noCourseCode
export function noCourseCodeValidator(control: AbstractControl): ValidationErrors | null {
  const val = String(control.value || '').toUpperCase();
  if (val.startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Step 55: Custom async validator simulateEmailCheck returning a Promise after 800ms
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const email = String(control.value || '').toLowerCase();
      if (email.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrls: ['./reactive-enrollment-form.component.css']
})
export class ReactiveEnrollmentFormComponent implements OnInit, HasUnsavedChanges {
  public enrollForm!: FormGroup;
  public submitted: boolean = false;

  // Step 49: Inject FormBuilder in constructor
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Step 49: Build reactive form model using FormBuilder
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      // Step 55: Async validator simulateEmailCheck passed as 3rd argument array
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      // Step 53: Custom sync validator noCourseCodeValidator applied
      courseId: ['', [Validators.required, noCourseCodeValidator]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      // Step 56: FormArray for dynamic repeating course controls
      additionalCourses: this.fb.array([])
    });
  }

  /*
   * Hands-On 5 Step 57 Explanation Comment:
   * ----------------------------------------------------------------------------------
   * Why typed getter is better than casting in template:
   * 1. A typed getter 'get additionalCourses(): FormArray' provides strong TypeScript typing.
   * 2. It avoids cumbersome and unsafe casting syntax like '(enrollForm.get("additionalCourses") as FormArray)'
   *    inside HTML templates, keeping templates clean and type-checked during build.
   * ----------------------------------------------------------------------------------
   */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  // Step 56: Add dynamic FormControl into FormArray
  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  // Step 56: Remove dynamic FormControl from FormArray
  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  // Step 51 & 52: Submit handler logging value and getRawValue()
  onSubmit(): void {
    if (this.enrollForm.valid) {
      /*
       * Hands-On 5 Step 52 Explanation Comment:
       * ----------------------------------------------------------------------------------
       * Difference between enrollForm.value and enrollForm.getRawValue():
       *
       * 1. enrollForm.value:
       *    Returns an object containing the values of enabled controls only. Disabled
       *    controls are excluded from the returned object.
       *
       * 2. enrollForm.getRawValue():
       *    Returns an object containing values of ALL controls regardless of whether they
       *    are enabled or disabled. Useful when disabled fields need to be sent to a backend API.
       * ----------------------------------------------------------------------------------
       */
      console.log('Reactive Form Value (value):', this.enrollForm.value);
      console.log('Reactive Form Raw Value (getRawValue):', this.enrollForm.getRawValue());
      this.submitted = true;
      this.enrollForm.markAsPristine();
    }
  }

  // UnsavedChangesGuard interface implementation
  hasUnsavedChanges(): boolean {
    return this.enrollForm && this.enrollForm.dirty && !this.submitted;
  }
}
