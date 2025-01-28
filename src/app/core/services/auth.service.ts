import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  tokenDecode:any
  userId!:string
  

  register(registerData:object):Observable<any>{
     return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup` , registerData)
  }

  login(loginData:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin` , loginData)

  }


  forgetPassword(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data)
  }

  verifyCode(data: { email: string; resetCode: string }): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }

  resetPassword(data:{email:string ; newPassword: string}):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , data)
  }

  saveDecodesToken():void{
    if(sessionStorage.getItem('token') != null){
      this.tokenDecode = jwtDecode(sessionStorage.getItem('token')!)
      return this.userId = this.tokenDecode.id 
    }
  }
}


``