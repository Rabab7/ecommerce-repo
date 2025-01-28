import { CartService } from './../../core/services/cart.service';
import { Component, DoCheck, inject, OnChanges, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { IWishlist } from '../../core/interfaces/iwishlist';
import { REACTIVE_NODE } from '@angular/core/primitives/signals';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit {
  private readonly _CartService= inject(CartService)
  private readonly _ToastrService= inject(ToastrService)
  private readonly  _WishListService = inject(WishListService)

  wishlistData!:IWishlist[] 
  p_id!:string
  heartIcon!: boolean;

 

 

  ngOnInit(): void {
    this._WishListService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.wishlistData = res.data
      }
    })
    
  }


  addToCart(p_id:string):void{
    this._CartService.addItemToCart(p_id).subscribe({
      next:(res)=>{
        this._CartService.cartCount.next(res.numOfCartItems)
        this._ToastrService.success(res.message , 'freshCart' , {timeOut:2000 , closeButton:true})

      }
    })
  }


  removeItemFromWishlist(p_id:string):void{
    this._WishListService.removeItemFromWishlist(p_id).subscribe({
      next:(res)=>{
        this._WishListService.getLoggedUserWishlist().subscribe({
          next:(res)=>{
            this.wishlistData = res.data
          },
          error:(err)=>{
            console.log(err)
          }
        })
         this._ToastrService.success(res.message , '❤' , {timeOut:2000 , closeButton:true })  
      }
    })
  }


 




  

  

}
