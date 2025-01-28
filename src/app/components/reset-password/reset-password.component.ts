import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgClass,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  constructor(private _FormBuilder:FormBuilder ,private _AuthService: AuthService, private _Router: Router) {}

  loading:boolean=false
  errorText!:string

  resetPasswordForm:FormGroup = this._FormBuilder.group({
          newPassword:[null , [Validators.required , Validators.minLength(6)]],
      
        })

 

  resetPassword() {
    const email = sessionStorage.getItem('email');
    if (this.resetPasswordForm.valid && email) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      this.loading=true


      this._AuthService.resetPassword({ email, newPassword }).subscribe({
        next: (res) => {
          sessionStorage.removeItem('email');
          this.errorText=res.message
          this.loading=false
          
          setTimeout(()=>{
            this._Router.navigate(['/login']);
          }, 2000)

        }
      });
    }
  }
}
