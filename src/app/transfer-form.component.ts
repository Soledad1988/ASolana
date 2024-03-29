import { Component, EventEmitter, Output, input } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatOption, MatSelect } from '@angular/material/select';
import Swal from 'sweetalert2';

export interface TransferFormModel{
  memo: string | null;
  amount: number  | null;
  receiverAddress:string | null;
 // mintAddress: string | null;
  token:{
    address:string,
    balance:number,
    info:{name:string, symbol:string,image:string};
  } | null;
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
            <mat-label>Coin</mat-label>
            <mat-select [(ngModel)]="model.token" name="token" required #tokenControl="ngModel">
              @for (token of tokens(); track token) {
                <mat-option [value]="token">
                <div class="flex item-center gap-2">
                  <img [src]="token.info.image" class="rounded-full w-8 h-8">
                  <span>{{token.info.symbol}}</span>
                </div>
              </mat-option>
              }
            </mat-select>

            @if(form.submitted && tokenControl.errors){
                <mat-error>
                @if(tokenControl.errors['required']) {
                  Coin is mandatory. 
                }
                </mat-error> 
            }@else{
                <mat-hint>The coin you want to transfer.</mat-hint>
            }
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-full mb-4">
            <mat-label>Concept</mat-label>
            <input name="memo" matInput type="text" placeholder="Ejemplo"
              [(ngModel)]="model.memo" required #memoControl="ngModel">
            <mat-icon matSuffix class="text-gray-600">description</mat-icon>

            @if(form.submitted && memoControl.errors){
                <mat-error>
                @if(memoControl.errors['required']) {
                  The reason is mandatory. 
                }
                </mat-error> 
            }@else{
                <mat-hint>It must be the reason for the transfer.</mat-hint>
            }
        </mat-form-field>

      
        <mat-form-field appearance="fill" class="w-full mb-4">
            <mat-label>Amount</mat-label>
            <input name="amount" matInput type="number" min="0" placeholder="Ingrese el monto aquí."
              [(ngModel)]="model.amount" required #amountControl="ngModel" [max]="tokenControl.value?.balance ?? undefined">
            <mat-icon matSuffix class="text-gray-600">attach_money</mat-icon>

            @if(form.submitted && amountControl.errors){
                <mat-error>
                @if(amountControl.errors['required']) {
                  The amount is mandatory.
                  } @else if (amountControl.errors['min']) {
                    The amount must be greater than zero.
                  } @else if (amountControl.errors['max']) {
                    The amount must be less than {{tokenControl.value.balance }}.
                  }
                </mat-error>
            }@else{
                <mat-hint>Enter the amount to send.</mat-hint>
            }
        </mat-form-field>


        <mat-form-field appearance="fill" class="w-full mb-4">
            <mat-label>receiver</mat-label>
            <input name="receiverAddress" matInput type="text" placeholder="Public Key de la wallet del destinatario."
              [(ngModel)]="model.receiverAddress" required #receiverAddressControl="ngModel">
            <mat-icon matSuffix class="text-gray-600">key</mat-icon>

            @if(form.submitted && receiverAddressControl.errors){
                <mat-error>
                @if(receiverAddressControl.errors['required']) {
                  The receiver is mandatory.
                  }
                </mat-error>
            }@else{
                <mat-hint>The receiver is mandatory.</mat-hint>
            }
        </mat-form-field>

      <footer class="flex justify-center font-mono">
        <button type="submit" mat-raised-button color="myGray">Send</button>
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
      token:null
    }

    readonly tokens = input<
    {address:string, balance: number; info: {image: string, name:string, symbol:string}}[]
    >([]);
    
    @Output() readonly submitForm = new   EventEmitter<TransferFormPayLoad>()

    onSubmitForm(form: NgForm){
      if(form.invalid || this.model.amount === null || this.model.memo=== null || this.model.receiverAddress === null || this.model.token === null){
        console.error('The form is invalid');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'The form is invalid',
          timer: 4000, // 4 segundos
          timerProgressBar: true
        });
      }else{
        this.submitForm.emit({
          amount:this.model.amount,
          memo:this.model.memo,
          receiverAddress:this.model.receiverAddress,
          mintAddress: this.model.token.address
        })
      }
    }
  }