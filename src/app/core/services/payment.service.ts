import { IAddress } from './../interfaces/iaddress';
import { AuthService } from './auth.service';
import { inject, Injectable } from '@angular/core';
import { AddressesService } from './addresses.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _AddressesService :AddressesService , private _HttpClient:HttpClient  ) { }
  
  
 

 checkoutSession(cart_id:string|null , shippingData:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cart_id}?url=${environment.url}` ,
     {"shippingAddress" : shippingData})
 }

 

 getUserOrders(userId:string):Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${userId}`)
 }





  


  

}
