import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  // Configurable highlight color via input binding (Hands-On 3 Step 37)
  @Input() appHighlight: string = 'yellow';

  constructor(private el: ElementRef) {}

  // @HostListener('mouseenter') binds to host element events without needing manual listeners (Step 33)
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.highlight(this.appHighlight || '#fef08a');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.highlight('');
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
