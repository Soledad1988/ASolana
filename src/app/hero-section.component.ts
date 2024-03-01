import { DecimalPipe } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { RouterModule } from "@angular/router";
import { ConnectionStore, WalletStore } from "@heavy-duty/wallet-adapter";
import { computedAsync } from "ngxtension/computed-async";
import { ShyftApiService } from "./shyft-api-service";
import { TransferModalComponent } from "./transfer.modal.component";


@Component({
    selector: 'my-proyect-hero-section',
    standalone: true,
    imports: [
        RouterModule,
        DecimalPipe,
        MatAnchor,
        MatButton,
        MatCardModule
    ],
    template: `

<section class="bg-gray-300 px-4 py-32 text-center">
    <div class="container mx-auto max-w-lg">
        <div class="absolute top-1/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            @if (account()) {
                <div class="flex flex-col items-center gap-3">
                    <h2 class="text-xl font-bold mb-2 bg-mygray text-myGray font-mono">Balance</h2>
                    <table class="py-2 flex items-center">
                      <tbody>
                        @for (item of account() ?? []; track $index) {
                          <tr class="bg-gray gap-2">
                            <td class="mr-4 gap-4"><img class="w-8 h-8 rounded-full" src="{{ item.info.image }}" alt="{{ item.info.name }}"></td>
                            <td class="mr-4 gap-4">{{ item.info.symbol }}</td>
                            <td class="mr-4">{{ item.balance }}</td>
                          </tr>
                        }
                      </tbody>
                    </table>

                <footer class="mt-2">
                    <button class="px-4 py-2 bg-myGray text-white font-mono rounded hover:bg-gray-300" (click)="onTransfer()">Transfer funds</button>
                </footer>
            </div>
        }
    </div>
    </div>
</section>

    `
  })

  export class HeroSectionComponent implements OnInit{
    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
    private readonly _matDialog = inject(MatDialog);
    private readonly _connectionStore=inject(ConnectionStore);

    readonly account = computedAsync(
      () => this._shyftApiService.getAllToken(this._publicKey()?.toBase58()),
      {requireSync: false},
    );

    ngOnInit(){
      this._connectionStore.setEndpoint(this._shyftApiService.getEndpoit());
    }

    onTransfer(){
      this._matDialog.open(TransferModalComponent);
    }
  }