import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    // Abre la ventana del navegador en modo maximizado
    window.moveTo(0, 0);
    window.resizeTo(screen.availWidth, screen.availHeight);
  })
  .catch(err => console.error(err));
