import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private readonly _ProductsService= inject(ProductsService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _CartService =inject(CartService)
  private readonly _WishListService= inject(WishListService)
  private readonly _ToastrService= inject(ToastrService)


  CategoriesSlider: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      autoplay:true,
      autoplayTimeout:2000,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      items:1,
    }

  productDetailsData:IProduct|null = null
  pId!:string | null

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(
      {
        next:(param)=>{
          
          this.pId=param.get('p_id')

        }
      }
    )

    this._ProductsService.getProductDetails(this.pId).subscribe({
      next:(res)=>{
        this.productDetailsData=res.data
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



  addToWishlist(p_id:string):void{
    this._WishListService.addItemToWishlist(p_id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message , '❤' , {timeOut:2000 , closeButton:true })  
       
      }
    })
  }




 

}
