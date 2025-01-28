import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService , private _Router:Router){}
  loading:boolean=false
  errorText!:string
  decodedToken:any


  loginForm:FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required , Validators.email]],
    password:[null , [Validators.required ,  Validators.pattern(/^\w{6,}$/)]]

  })


  login():void{
    if(this.loginForm.valid){
      const loginData = this.loginForm.value
      this.loading = true

      this._AuthService.login(loginData).subscribe({
        next:(res)=>{
          sessionStorage.setItem('token', res.token);

          // decoded token

         this.decodedToken= this._AuthService.saveDecodesToken()
          this.errorText=res.message
          this.loading=false

          setTimeout(()=>{
            this._Router.navigate(['/home'])
          } , 2000) 

        },

        error:(error)=>{
          console.log(error)
          this.errorText=error.error.message
          this.loading=false
        },

      })

    }
    

  }

 
  

}
