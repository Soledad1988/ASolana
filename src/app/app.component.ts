import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './ShyftApiService';
import { WalletStore } from '@heavy-duty/wallet-adapter';

@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent],
  selector: 'my-proyect-root',
  template: `
    <header class="py-8">
      <h1 class="text-5xl text-center mb-4">Hola, soy Brenda</h1>

    <div class="felx justify-center">
      <hd-wallet-multi-button></hd-wallet-multi-button>
    </div>
    </header>
    `
})

export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = this._walletStore.publicKey$;
}

//``   <>
