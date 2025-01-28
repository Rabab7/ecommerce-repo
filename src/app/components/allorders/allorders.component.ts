import { Component, inject, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';
import { AuthService } from '../../core/services/auth.service';
import {  IUserOrders } from '../../core/interfaces/iuser-orders';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {
  private readonly _PaymentService= inject(PaymentService)
  private readonly _AuthService = inject(AuthService)

  userId:any
  userOrders!:IUserOrders[]

  ngOnInit(): void {
    this.userId = this._AuthService.saveDecodesToken();
    this._PaymentService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        this.userOrders = res
        
      }
    });
  }



}
