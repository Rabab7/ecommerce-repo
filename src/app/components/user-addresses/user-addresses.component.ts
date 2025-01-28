import { Component, OnInit } from '@angular/core';
import { AddressesService } from '../../core/services/addresses.service';
import { IAddress } from '../../core/interfaces/iaddress';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-addresses',
  standalone: true,
  imports: [],
  templateUrl: './user-addresses.component.html',
  styleUrl: './user-addresses.component.css'
})
export class UserAddressesComponent implements OnInit {
  constructor(private _AddressesService:AddressesService){}

  userAddressesData!:IAddress[]

  ngOnInit(): void {
    this._AddressesService.getLoggedUserAddresses().subscribe({
      next:(res)=>{
        this.userAddressesData = res.data 
      }
    })
  }

  removeSpecificAddress(address_id:string):void{
    this._AddressesService.removeSpecificAddress(address_id).subscribe({
      next:(res)=>{
        this.userAddressesData = res.data
      }
    })
  }



}
