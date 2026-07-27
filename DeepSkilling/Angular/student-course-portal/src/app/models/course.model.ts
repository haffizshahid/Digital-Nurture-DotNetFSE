export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
}

export interface Student {
  id: number;
  name: string;
  email: string;
  courseId: number;
}

export interface Enrollment {
  id?: number;
  studentName: string;
  studentEmail: string;
  courseId: number;
  preferredSemester: string;
  agreeToTerms: boolean;
}
