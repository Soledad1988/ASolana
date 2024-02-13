import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAnchor } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './ShyftApiService';

@Component({
  standalone: true,
  imports: [
    RouterModule, 
    HdWalletMultiButtonComponent,
    DecimalPipe,
    MatAnchor
  ],
  selector: 'my-proyect-root',
  template: `
    <header class="px-16 pt-18 pb-8 relative bg-black text-white">
    <h1 class="text-center text-5xl mb-4 py-5">My Bank</h1>
    
      @if(account()){
        <div class="absolute top-16 left-1/4 flex flex-col items-center gap-2">
          <h2 class="text-2xl font-bold mb-2">Balance</h2>
          <img [src]="account()?.info?.image" class="w-16 h-16 mb-2">
          <p class="text-2xl font-bold">{{account()?.balance | number }}</p>
      </div>
      }

      <nav>
      <ul class="flex justify-center gap-4">
        <li>
          <a [routerLink]="['']" class="inline-block px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-white font-semibold" mat-button style="color: white;">Home</a>
        </li>
        <li>
          <a [routerLink]="['settings']" class="inline-block px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-white font-semibold" mat-button style="color: white;">Settings</a>
        </li>
      </ul>
    </nav>

    <div class="flex justify-center mb-4 py-4">
      <hd-wallet-multi-button></hd-wallet-multi-button>
    </div>

    </header>
    
    <main>
      <router-outlet></router-outlet>
    </main>
    `
})

export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    {requireSync: true},
  );

}


