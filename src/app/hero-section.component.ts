import { DecimalPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatAnchor } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { WalletStore } from "@heavy-duty/wallet-adapter";
import { computedAsync } from "ngxtension/computed-async";
import { ShyftApiService } from "./ShyftApiService";


@Component({
    selector: 'my-proyect-hero-section',
    standalone: true,
    imports: [
        RouterModule,
        DecimalPipe,
        MatAnchor,
    ],
    template: `
    <section class="bg-gray-300 px-4 py-32 text-center">
        @if(account()){
        <div class="absolute top-1/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <div class="flex items-center">  
            <h2 class="text-2xl font-bold mb-2">Balance</h2>
          </div>
          <div class="flex items-center gap-5">
            <img [src]="account()?.info?.image" class="w-14 h-14 rounded-full mb-2">
            <p class="text-2xl font-bold">{{account()?.balance}}</p>
          </div>
       </div>
      }
        
    </section>
    `
  })

  export class HeroSectionComponent {

    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  
    readonly account = computedAsync(
      () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
      {requireSync: false},
    );
  }