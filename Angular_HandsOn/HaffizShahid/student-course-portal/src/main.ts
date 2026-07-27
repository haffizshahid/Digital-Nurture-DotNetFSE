import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Hands-On 1 Hint: Modern Angular 17+ standalone bootstrap Application API
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
