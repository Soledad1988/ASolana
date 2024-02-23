import { Component } from "@angular/core";
import { createTransferInstructions } from "@heavy-duty/spl-utils";
import { injectTransactionSender } from "@heavy-duty/wallet-adapter";
import { TransferFormComponent, TransferFormPayLoad } from "./transfer-form.component";


@Component({
    selector: 'my-proyect-transfer-section',
    standalone: true,
    template: `
    <div class="px-8 pt-16 pb8-">
      <h2 class="text-3xl text-center mb-8">Transferir Fondos</h2>

      <my-proyect-transfer-form (submitForm)="onTransfer($event)"></my-proyect-transfer-form> <!--$event-->
    </div>
    `,
    imports: [TransferModalComponent, TransferFormComponent]
})

  export class TransferModalComponent {
    private readonly _transactionSender = injectTransactionSender();
    onTransfer(payload: TransferFormPayLoad){
  
      this._transactionSender.send(({publicKey})=> 
        createTransferInstructions({
          amount: payload.amount,
          mintAddress: '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
          receiverAddress: payload.receiverAddress,
          senderAddress: publicKey.toBase58(),
          fundReceiver: true,
          memo: payload.memo
        }),

      ).subscribe({
        next:(signature)=>console.log(`Firma: ${signature}`),
        error: (error) => console.error(error),
        complete: () => console.log('Transaccion lista.')
      })
    }

  }


