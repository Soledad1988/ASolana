import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { WalletStore } from "@heavy-duty/wallet-adapter";
import { computedAsync } from "ngxtension/computed-async";
import { ShyftApiService } from "./ShyftApiService";


@Component({
    selector: 'my-proyect-transactions-section',
    standalone: true,
    template: `
    <section class="bg-gray-300 px-4 py-32 text-center">

      @if(transactions()){
        <div class="absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <h2 class="text-2xl font-bold mb-2">Historial Transacciones</h2>
          <p class="text-2xl font-bold">{{transactions()}}</p>
          <ul>
            <li>Fecha: </li>
            <li>Tipo: </li>
            <li>Monto: </li>
          </ul>
        </div>
      }
    </section>

    `
  })

  export class TransactionssectionComponent {
    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  
    readonly transactions = computedAsync(
      () => this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
      {requireSync: false},
    );
  }