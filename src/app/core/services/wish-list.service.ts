import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient)
  // token:any = {token : sessionStorage.getItem('token')}
  

  getLoggedUserWishlist():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist` )
  }

  addItemToWishlist(p_id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist` , {"productId" : p_id} )
  }

  removeItemFromWishlist(p_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${p_id}` )
  }

 
}
