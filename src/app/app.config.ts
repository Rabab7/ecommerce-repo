import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { reqHeaderInterceptor } from './core/interceptors/req-header.interceptor';
import { resErrorInterceptor } from './core/interceptors/res-error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingSpinnerInterceptor } from './core/interceptors/loading-spinner.interceptor';
import { HashLocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes , withViewTransitions()),provideToastr(),provideHttpClient(withFetch() , withInterceptors([reqHeaderInterceptor , resErrorInterceptor , loadingSpinnerInterceptor]) ),importProvidersFrom(BrowserAnimationsModule , NgxSpinnerModule) ,provideClientHydration()]
};
