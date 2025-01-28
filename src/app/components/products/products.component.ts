import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { WishListService } from '../../core/services/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,FormsModule,SearchPipe,NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private _ProductsService:ProductsService, private _CartService: CartService ,private _Router:Router){}
  private readonly _WishListService= inject(WishListService)
  private readonly _ToastrService= inject(ToastrService)
  
  
    productsData!:IProduct[]
    productSubscription!:Subscription

    searchkey:string=''
    heartIcon!:boolean

    ngOnInit(): void {
      this.productSubscription= this._ProductsService.getAllProducts().subscribe({
        next:(res)=>{
          
          this.productsData=res.data
        },
      })

    }

    addToCart(p_id:string):void{
      this._CartService.addItemToCart(p_id).subscribe({
        next:(res)=>{
          this._CartService.cartCount.next(res.numOfCartItems)
          this._ToastrService.success(res.message , 'freshCart' , {timeOut:2000 , closeButton:true})
  
        },
      })
    }
  


    addToWishlist(p_id:string):void{
      this._WishListService.addItemToWishlist(p_id).subscribe({
        next:(res)=>{
          this._ToastrService.success(res.message , '❤' , {timeOut:2000 , closeButton:true })  
          this.productsData = this.productsData.map((product) =>
            product._id === p_id ? { ...product, heartIcon: true } : product
          );
        },
      })
    }

  
     

    

    


}
