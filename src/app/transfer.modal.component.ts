import { Component } from "@angular/core";
import { TransferFormComponent, TransferFormPayLoad } from "./transfer-form.component";


@Component({
    selector: 'my-proyect-transfer-section',
    standalone: true,
    template: `
    <div class="px-8 pt-16 pb8-">
      <h2 class="text-3xl text-center mb-8">Transferir Fondos</h2>

      <my-proyect-transfer-form (submitForm)="onTransfer($event)"></my-proyect-transfer-form>
    </div>
    `,
    imports: [TransferModalComponent, TransferFormComponent]
})

  export class TransferModalComponent {
    onTransfer(payload: TransferFormPayLoad){
      console.log('Hola mundo', payload);
    }
  }