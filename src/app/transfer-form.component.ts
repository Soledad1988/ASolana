import { Component, EventEmitter, Output, input } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatOption, MatSelect } from '@angular/material/select';

export interface TransferFormModel{
  memo: string | null;
  amount: number  | null;
  receiverAddress:string | null;
  mintAddress: string | null;
}

export interface TransferFormPayLoad{
  memo: string;
  amount: number;
  receiverAddress:string;
  mintAddress: string;
}

@Component({
    selector: 'my-proyect-transfer-form',
    standalone: true,
    template: `

    <div>
      <form #form="ngForm" (ngSubmit)="onSubmitForm(form)" class="w-2/4 mx-auto bg-gray-200 rounded-lg p-6 border border-gray-300">
  
        <mat-form-field appearance="fill" class="w-full mb-4">
            <mat-label>Moneda</mat-label>
            <mat-select [(ngModel)]="model.mintAddress" name="mintAddress" required #mintAddresControl="ngModel">
              @for (token of tokens(); track token) {
                <mat-option [value]="token.address">
                <div class="flex item-center gap-2">
                  <img [src]="token.info.image" class="rounded-full w-8 h-8">
                  <span>{{token.info.symbol}}</span>
                </div>
              </mat-option>
              }
            </mat-select>

            @if(form.submitted && mintAddresControl.errors){
                <mat-error>
                @if(mintAddresControl.errors['required']) {
                  La moneda es obligatoria. 
                }
                </mat-error> 
            }@else{
                <mat-hint>La moneda que deseas transferir.</mat-hint>
            }
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-full mb-4">
            <mat-label>Concepto</mat-label>
            <input name="memo" matInput type="text" placeholder="Ejemplo"
              [(ngModel)]="model.memo" required #memoControl="ngModel">
            <mat-icon matSuffix class="text-gray-600">description</mat-icon>

            @if(form.submitted && memoControl.errors){
                <mat-error>
                @if(memoControl.errors['required']) {
                  El motivo es obligatorio. 
                }
                </mat-error> 
            }@else{
                <mat-hint>Debe ser el motivo de la transferencia</mat-hint>
            }
        </mat-form-field>

      
        <mat-form-field appearance="fill" class="w-full mb-4">
            <mat-label>Monto</mat-label>
            <input name="amount" matInput type="number" min="0" placeholder="Ingrese el monto aquí."
              [(ngModel)]="model.amount" required #amountControl="ngModel">
            <mat-icon matSuffix class="text-gray-600">attach_money</mat-icon>

            @if(form.submitted && amountControl.errors){
                <mat-error>
                @if(amountControl.errors['required']) {
                  El monto es obligatorio.
                  } @else if (amountControl.errors['min']) {
                    El monto debe ser mayor a cero.
                  }
                </mat-error>
            }@else{
                <mat-hint>Debe ser el motivo de la transferencia</mat-hint>
            }
        </mat-form-field>


        <mat-form-field appearance="fill" class="w-full mb-4">
            <mat-label>Destinatario</mat-label>
            <input name="receiverAddress" matInput type="text" placeholder="Public Key de la wallet del destinatario."
              [(ngModel)]="model.receiverAddress" required #receiverAddressControl="ngModel">
            <mat-icon matSuffix class="text-gray-600">key</mat-icon>

            @if(form.submitted && receiverAddressControl.errors){
                <mat-error>
                @if(receiverAddressControl.errors['required']) {
                  El monto es obligatorio.
                  }
                </mat-error>
            }@else{
                <mat-hint>El destinatario es obligatorio</mat-hint>
            }
        </mat-form-field>

      <footer class="flex justify-center font-mono">
        <button type="submit" mat-raised-button color="myGray">Enviar</button>
      </footer>
    </form>
  </div>
    `,
    imports:[FormsModule, MatFormFieldModule, MatInput, MatSelect,MatOption, MatIcon, MatButton]
  })
  
  export class TransferFormComponent {
    readonly model: TransferFormModel = {
      amount:null,
      memo:null,
      receiverAddress:null,
      mintAddress:null
    }

    readonly tokens = input<
    {address:string, balance: number; info: {image: string, name:string, symbol:string}}[]
    >([]);
    
    @Output() readonly submitForm = new   EventEmitter<TransferFormPayLoad>()

    onSubmitForm(form: NgForm){
      if(form.invalid || this.model.amount === null || this.model.memo=== null || this.model.receiverAddress === null || this.model.mintAddress === null){
        console.error('El formulario es invalido');
      }else{
        this.submitForm.emit({
          amount:this.model.amount,
          memo:this.model.memo,
          receiverAddress:this.model.receiverAddress,
          mintAddress:this.model.mintAddress
        })
      }
    }
  }