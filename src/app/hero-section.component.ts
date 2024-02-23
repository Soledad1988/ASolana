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
                <div class="flex flex-col items-center gap-2">
                    <h2 class="text-xl font-bold mb-2">Balance</h2>
                    <div class="overflow-auto max-h-60">
                        <ul class="divide-y divide-gray-400">
                        @for (item of account()  ?? []; track $index) {
                          <li class="py-2 flex items-center">
                                    <div class="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full mr-2">
                                        <img class="w-6 h-6 rounded-full" src="{{ item.info.image }}" alt="{{ item.info.name }}">
                                    </div>
                                    <div>
                                        <span class="text-sm font-semibold">{{ item.info.name }}</span>
                                        <div class="flex items-center text-xs">
                                            <span class="mr-1">{{ item.info.symbol }}</span>
                                            <span>{{ item.balance }}</span>
                                        </div>
                                    </div>
                                </li>
                          }
                      </ul>
                </div>
                <footer class="mt-2">
                        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" (click)="onTransfer()">Transferir Fondos</button>
                </footer>
            </div>
        }
    </div>
    </div>
</section>


<!--
        <footer class="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-full">
          <div class="flex justify-center">
            <button mat-raised-button color="primary" (click)="onTransfer()">Transferir Fondos</button>
          </div>
        </footer>
    -->

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