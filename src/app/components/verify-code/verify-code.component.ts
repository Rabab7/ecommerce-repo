import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent {
   constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService,private _Router:Router){}
      loading:boolean=false
      errorText!:string
    
    
      verifyCodeForm:FormGroup = this._FormBuilder.group({
        resetCode:[null , [Validators.required]],
    
      })
    
    
      verifyCode(): void {
        const email = sessionStorage.getItem('email') 
        if (this.verifyCodeForm.valid && email) {
          const resetCode = this.verifyCodeForm.get('resetCode')?.value; 
          const data = { email, resetCode }; 
      
          this.loading = true;
      
          this._AuthService.verifyCode(data).subscribe({
            next: (res) => {
              console.log(res);
              this.errorText = res.message;
              this.loading = false;
      
              setTimeout(() => {
                this._Router.navigate(['/resetPassword']);
              }, 2000);
            }
          });
        } 
      }
      
      
}
