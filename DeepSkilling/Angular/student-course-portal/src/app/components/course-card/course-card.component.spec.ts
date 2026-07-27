import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { CourseCardComponent } from './course-card.component';
import { provideRouter } from '@angular/router';

// Hands-On 10 Task 1: Testing CourseCardComponent
describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(async () => {
    // Step 101: Configure TestBed
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
  });

  // Step 102: Verify component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 103: Test @Input rendering
  it('should display course name when @Input course is set', () => {
    component.course = {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    };
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(titleElement.textContent).toContain('Data Structures');
  });

  // Step 104: Test @Output event emission
  it('should emit enrollRequested event with course ID when enroll button is clicked', () => {
    component.course = {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    };
    fixture.detectChanges();

    spyOn(component.enrollRequested, 'emit');

    const button = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  // Step 105: Test ngOnChanges console log
  it('should log changes when ngOnChanges is called', () => {
    spyOn(console, 'log');

    component.ngOnChanges({
      course: new SimpleChange(null, { id: 1, name: 'Data Structures' }, true)
    });

    expect(console.log).toHaveBeenCalled();
  });
});
