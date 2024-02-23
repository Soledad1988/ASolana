import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";
import { WalletStore } from "@heavy-duty/wallet-adapter";
import { computedAsync } from "ngxtension/computed-async";
import { ShyftApiService } from "./shyft-api-service";


@Component({
    selector: 'my-proyect-transactions-section',
    standalone: true,
    imports: [MatCardModule, MatIcon
    
  ],
    template: `
    <section class="bg-gray-300 px-4 py-32 text-center">
    @if (account()) {
        <div class="absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
        
        <div class="mat-elevation-z8" style="max-height: 200px; overflow-y: auto;">
            <h2 class="text-2xl font-bold mb-2">Historial Transacciones</h2>
            <table class="table-auto">
                <thead>
                    <tr>
                        <th class="px-4 py-2">TimesTamp</th>
                        <th class="px-4 py-2">Fee</th>
                        <th class="px-4 py-2 text-sm">Fee Payer</th>
                    </tr>
                </thead>
                <tbody>
                  
                    @for (trans of transacciones() ?? []; track $index) {
                      <tr class="bg-white">
                        <td class="px-4 py-2">{{ trans.timestamp }}</td>
                        <td class="px-4 py-2">{{ trans.fee }}</td>
                        <td class="px-4 py-2 text-sm">{{ trans.fee_payer }}</td>
                    </tr>
                    }
                  </tbody>
                </table>
            </div>
        </div>
      }
    </section>

    `,
  
  })

  export class TransactionssectionComponent {
    private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAllToken(this._publicKey()?.toBase58()),
    { requireSync: false },
  );

  readonly transacciones = computedAsync(
    () => this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
    { requireSync: false },
  );

}
    