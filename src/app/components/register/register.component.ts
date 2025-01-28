import { NgClass} from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  

  constructor(private _AuthService:AuthService , private _Router:Router){}
  loading:boolean=false
  errorText!:string

  registerForm :FormGroup = new FormGroup({
    name:new FormControl(null, [Validators.required , Validators.minLength(3), Validators.maxLength(5)]),
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required ,  Validators.pattern(/^\w{6,}$/) ]),
    rePassword: new FormControl(null),
    phone: new FormControl(null , [ Validators.required  , Validators.pattern(/^01[125][0-9]{8}$/)]),
  } , this.confirmPassword)

  confirmPassword(g: AbstractControl){
    return g.get('password')?.value === g.get('rePassword')?.value ? null : {missMatch:true};
   
  }

  register():void{
    console.log(this.registerForm)
    if(this.registerForm.valid){
      const registerData = this.registerForm.value
      this.loading=true
      this._AuthService.register(registerData).subscribe({
        next:(res)=>{
          console.log(res)
          this.errorText=res.message
          this.loading=false 

          setTimeout(()=>{
            this._Router.navigate(['/login'])
          } , 2000)
        },

        error:(error)=>{
          console.log(error)
          this.errorText=error.error.message
          this.loading=false
        }
      })
    }
    else{
      this.registerForm.setErrors({'missMatch':true})
      this.registerForm.markAllAsTouched();
       
    }
  }

}
