import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { error } from 'console';
import { IBrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit , OnDestroy {
  
  private readonly _BrandsService =inject(BrandsService)

  brandsData!:IBrands[]
  brandsSubscription!:Subscription

  ngOnInit(): void {
    this.brandsSubscription = this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brandsData=res.data
      }
    })
  }

  ngOnDestroy(): void {
    this.brandsSubscription.unsubscribe()
  }

  

}
