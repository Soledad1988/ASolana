import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { FeaturesectionComponent } from "./features-section.component";
import { HeroSectionComponent } from "./hero-section.component";

@Component({
    standalone: true,
    selector: 'my-proyect-root',
    template: `
   <div class="flex justify-center items-center h-screen">
      <div class="w-full max-w-2xl sm:max-w-3xl rounded-lg overflow-hidden">
        <header class="px-16 pt-18 pb-8 relative bg-black text-white">

          <div class="flex justify-between items-center mb-4">
          <div></div><!-- Espacio en blanco para alinear el icono de configuración -->
             <h1 class="text-center text-5xl mb-4 py-5 text-myGray font-mono">Wallet</h1>
             <a [routerLink]="['settings']" class="text-white">
                  <i class="fas fa-cog text-lg text-myGray"></i>
              </a>
          </div>
        

        <div class="flex justify-center mb-4 py-4">
          <hd-wallet-multi-button></hd-wallet-multi-button>
        </div>

          <nav>
          <ul class="flex justify-center gap-4">
            <li>
              <a [routerLink]="['']" class="inline-block px-4 py-2 bg-gray-300 hover:bg-myGray rounded-md text-black font-mono" mat-button style="color: white;">Balance</a>
            </li>
            <li>
              <a [routerLink]="['settings']"></a>
            </li>
            <li>
              <a [routerLink]="['transactions']" class="inline-block px-4 py-2 bg-gray-300 hover:bg-myGray  rounded-md text-white font-mono" mat-button style="color: white;">transactions</a>
            </li>
          </ul>
        </nav>
        </header>
        
        <main>
          <router-outlet></router-outlet>
        </main>

        <footer>
          <my-proyect-features-section></my-proyect-features-section>
        </footer>
      </div>
    </div>
    `,
    imports: [
        RouterModule,
        HdWalletMultiButtonComponent,
        DecimalPipe,
        MatAnchor,
        HeroSectionComponent,
        FeaturesectionComponent,
    ]
})

export class AppComponent {
}


