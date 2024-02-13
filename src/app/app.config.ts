import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@Angular/platform-browser/animations/async';
import { appRoutes } from './app.routes';
import { provideWalletAdapter } from '@heavy-duty/wallet-adapter';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), 
    provideAnimationsAsync(), 
    provideWalletAdapter()],
};
