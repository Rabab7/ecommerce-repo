import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { error } from 'node:console';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {


  constructor(private _ProductsService:ProductsService,private _CartService:CartService ,private _ActivatedRoute :ActivatedRoute , private _Router:Router){}
  pId!:string|null
  cartSubscription!:Subscription
  cartData!:ICart 

 

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        
        this.cartData=res.data
        this._CartService.cartCount.next(res.numOfCartItems)
       
      }
    })


  }

  updateItemQuantity(p_id:string , count:number):void{
    if(count > 0){
      this._CartService.updateItemQuantity(p_id , count).subscribe({
        next:(res)=>
          {
            
            this.cartData=res.data
          }
  
      })
    }

  }

  removeItemFromCart(p_id:string):void{
    this._CartService.removeSpecificItem(p_id).subscribe({
      next:(res)=>
        {
          this._CartService.cartCount.next(res.numOfCartItems)
          this.cartData=res.data
        }
    })
  }

  clearCart():void{
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        this.cartData=res.data
        this._CartService.cartCount.next(0)
        setTimeout(()=>{
          this._Router.navigate(['/home'])
        } , 1000)

      },
    })
  }


 





}