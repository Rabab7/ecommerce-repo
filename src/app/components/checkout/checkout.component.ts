import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../core/services/payment.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { log } from 'console';
import { AddressesService } from '../../core/services/addresses.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass , RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private readonly _FormBuilder = inject(FormBuilder) 
private readonly _Router = inject(Router)
private readonly _ActivatedRoute = inject(ActivatedRoute)
private readonly _PaymentService =  inject(PaymentService)
private readonly _AddressesService =  inject(AddressesService)

loading:boolean=false
messageText!:string
cart_id!:string|null


 addressForm:FormGroup = this._FormBuilder.group({
    details:[null , [Validators.required ]],
    phone:[null , [ Validators.required ]],
    city:[null , [Validators.required ]],


  })

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe(
    {
      next:(param)=>{
        
        this.cart_id=param.get('cart_id')
        

      }
    }
  )
 
}

payOrder():void{
  this._PaymentService.checkoutSession(this.cart_id , this.addressForm.value).subscribe({
    next:(res)=>{
      window.open(res.session.url , '_self')
      

    }
  })
}


}
