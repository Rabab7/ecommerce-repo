import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) {}
  //token:any ={token: sessionStorage.getItem('token')}
  cartCount :BehaviorSubject<number> = new BehaviorSubject(0)

  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart` )
  }

  addItemToCart(p_id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart` , {productId:p_id} )
  }

  removeSpecificItem(p_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${p_id}`)

  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }

  updateItemQuantity(p_id:string , count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_id}`, { "count": count });
  }

 
}
