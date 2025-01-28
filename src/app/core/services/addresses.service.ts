import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor() { }
  private readonly _HttpClient= inject(HttpClient)
 

  getLoggedUserAddresses():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/addresses` )
  }


  removeSpecificAddress(address_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/addresses/${address_id}`)
  }


}
