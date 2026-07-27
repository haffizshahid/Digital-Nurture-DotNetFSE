import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent {
  public submitted: boolean = false;

  // Step 40: onSubmit(form: NgForm) method logging form.value and form.valid
  onSubmit(form: NgForm): void {
    console.log('Template-Driven Form Submitted!');
    console.log('Form Value:', form.value);
    console.log('Form Valid State:', form.valid);
    this.submitted = true;
  }

  // Step 47: Reset method calling form.resetForm()
  resetForm(form: NgForm): void {
    form.resetForm();
    this.submitted = false;
  }
}
