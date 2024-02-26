import { Component, inject } from "@angular/core";
import { createTransferInstructions } from "@heavy-duty/spl-utils";
import { injectPublicKey, injectTransactionSender } from "@heavy-duty/wallet-adapter";
import { computedAsync } from "ngxtension/computed-async";
import Swal from 'sweetalert2';
import { ShyftApiService } from "./shyft-api-service";
import { TransferFormComponent, TransferFormPayLoad } from "./transfer-form.component";



@Component({
    selector: 'my-proyect-transfer-section',
    standalone: true,
    imports: [TransferModalComponent, TransferFormComponent],
    template: `
    <div class="px-8 pt-20 pb-8" style="background-color:black">
      <h2 class="text-3xl text-center font-mono text-myGray mb-8">Transferir Fondos</h2>

      <my-proyect-transfer-form 
      (submitForm)="onTransfer($event)"
      [tokens] = "allTokens() ?? []"
      ></my-proyect-transfer-form>
    </div>
    `,
    
  
})

  export class TransferModalComponent {
    private readonly _transactionSender = injectTransactionSender();
    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _publicKey = injectPublicKey();

    readonly allTokens = computedAsync( () => 
    this._shyftApiService.getAllToken(this._publicKey()?.toBase58()),
    );

    
    onTransfer(payload: TransferFormPayLoad){

      Swal.mixin({
        title: 'Transacción en progreso',
        text: 'Por favor, espere mientras se completa la transacción...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      }).fire();

      this._transactionSender.send(({publicKey})=> 
        createTransferInstructions({
          amount: payload.amount*10**9,
          mintAddress: '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
          receiverAddress: payload.receiverAddress,
          senderAddress: publicKey.toBase58(),
          fundReceiver: true,
          memo: payload.memo
        }),
      ).subscribe({
        next: (signature) => {
            Swal.close();
            Swal.fire('Transacción completada con éxito', '', 'success');
            console.log(`Firma: ${signature}`);
        },

        
        error: (error) => {
            Swal.close();
            Swal.fire('Error', 'Hubo un problema al completar la transacción', 'error');
            console.error(error);
        },
        complete: () => console.log('Transacción lista.')
    })

  }

}

