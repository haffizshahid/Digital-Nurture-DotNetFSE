import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel',
  standalone: true
})
export class CreditLabelPipe implements PipeTransform {
  // Transforms credit count into human-readable string (Hands-On 3 Step 35)
  // Handles edge cases (null, 0) by returning 'No Credits'
  transform(credits: number | null | undefined): string {
    if (credits === null || credits === undefined || credits === 0) {
      return 'No Credits';
    }
    if (credits === 1) {
      return '1 Credit';
    }
    return `${credits} Credits`;
  }
}
