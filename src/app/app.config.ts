import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appRoutes } from './app.routes';
import { provideWalletAdapter } from '@heavy-duty/wallet-adapter';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), 
    provideAnimationsAsync(), 
    provideWalletAdapter(),
    provideHttpClient()
  ],
};
