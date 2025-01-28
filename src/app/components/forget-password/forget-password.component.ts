import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
    constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService,private _Router:Router){}
    loading:boolean=false
    errorText!:string
  
  
    forgetPasswordForm:FormGroup = this._FormBuilder.group({
      email:[null , [Validators.required , Validators.email]],
  
    })
  
  
    forgetPassword():void{
      if(this.forgetPasswordForm.valid){
        
        const forgetPasswordData = this.forgetPasswordForm.get('email')?.value
        console.log(forgetPasswordData)
        
        this.loading = true
  
        this._AuthService.forgetPassword({ email: forgetPasswordData }).subscribe({
          next:(res)=>{
        
            JSON.stringify(sessionStorage.setItem('email', forgetPasswordData))
            this._Router.navigate(['/verifyCode'])
            this.errorText=res.message
            this.loading=false
  
          }
        })
  
      }
      
  
    }

}
