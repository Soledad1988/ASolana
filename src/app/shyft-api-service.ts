import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, of } from "rxjs";

@Injectable({ providedIn: 'root'} )
export class ShyftApiService{

    private readonly _httpClient = inject(HttpClient);
    private readonly _header ={ 'x-api-key':'QRCBAfA43rrbM3hC'}; 
    private readonly _mint = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';
    
    getAccount(publicKey: string | undefined | null) {
        if (!publicKey) {
            return of(null);
        }

        const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');

        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('wallet', publicKey);
        url.searchParams.set('token', this._mint);

        return this._httpClient.get<{ 
            result: { balance: number; info:{ image: String}};
        }>(url.toString(),
        { headers: this._header}
        )
        .pipe(map((response)=> response.result));
    }

    getTransactions(publicKey: string | undefined | null) {
        if (!publicKey) {
            return of([]);
        }
    
        const url = new URL('https://api.shyft.to/sol/v1/transaction/history');
    
        url.searchParams.set('network', 'mainnet-beta'); 
        url.searchParams.set('account', publicKey);
        url.searchParams.set('tx_num', '2');
      
        return this._httpClient.get<{ 
            result: { timestamp:string, fee: string, fee_payer:string}[]}>(url.toString(),
        { headers: this._header}
        )
        .pipe(map((response)=> response.result));
    }


}
