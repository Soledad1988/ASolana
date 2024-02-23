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
 <section class="bg-gray-300 px-4 py-32 text-center relative">
  <div class="flex flex-col items-center">
  
   @if (account()) {    
        <div class="absolute top-1/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 class="text-2xl font-bold mb-4">Balance</h2>
          <div class="flex flex-col items-center gap-4">
            <table class="table-auto border-collapse border border-gray-800 w-full">
              <thead>
                <tr class="bg-gray-400">
                  <th class="px-4 py-2">Moneda</th>
                  <th class="px-4 py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                @for (item of account(); track $index) {
                  <tr class="bg-gray-200">
                    <td class="px-4 py-2">
                      <div class="flex items-center">
                       <div class="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center mr-2">
                          <img class="w-8 h-8 rounded-full" src="{{ item.info.image }}" alt="{{ item.info.name }}">
                        </div>
                        <span>{{ item.info.name }} ({{ item.info.symbol }})</span>
                      </div>
                    </td>
                    <td class="px-4 py-2">{{ item.balance }}</td>
                  </tr>
                }
              </tbody>
            </table>
            
          </div>
        </div>

        <footer class="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-full">
          <div class="flex justify-center">
            <button mat-raised-button color="primary" (click)="onTransfer()">Transferir Fondos</button>
          </div>
        </footer>
      }
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

    readonly account2 = computedAsync(
      () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
      {requireSync: false},

    );

    ngOnInit(){
      this._connectionStore.setEndpoint(this._shyftApiService.getEndpoit());
    }

    onTransfer(){
      this._matDialog.open(TransferModalComponent);
    }
  }