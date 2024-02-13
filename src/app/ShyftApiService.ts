import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, of } from "rxjs";

@Injectable({ providedIn: 'root'} )
export class ShyftApiService{

    private readonly _httpClient = inject(HttpClient);
    private readonly _header ={ 'x-api-key':'QRCBAfA43rrbM3hC'}; 
    private readonly _mint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

    getAccount(publicKey: string | undefined | null) {
        if (!publicKey) {
            return of(null);
        }

        const url = new URL('https://api.shyft.to/sol/v1/wallet/balance?network=devnet&wallet=97a3giHcGsk8YoEgWv4rP1ooWwJBgS72fpckZM6mQiFH');

        url.searchParams.set('network', 'mainnet-bets');
        url.searchParams.set('wallet', publicKey);
        url.searchParams.set('token', this._mint);

        return this._httpClient.get<{ 
            result: { balance: number; info:{ image: String}};
        }>(url.toString(),{ headers: this._header})
        .pipe(map((response)=> response.result));
    }
}