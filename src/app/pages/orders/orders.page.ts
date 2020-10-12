import { Component, OnInit } from '@angular/core';
import { utils } from 'src/app/services/utils';
import {  BitmexOrder } from '../../models/bitmex.model';
import{BitmexService} from '../../services/bitmex.service'; 

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  Orders: BitmexOrder[] = [] ;
  constructor( public bitmexServ: BitmexService) { }

  ngOnInit() {
    this.readOrdersFromStorage();
    this.setOrdersOnOrdesUpdated();
    this.updateOrdersRuningTimes();
  }

  private readOrdersFromStorage(){
    var savedOrders :BitmexOrder[] = this.bitmexServ.readFromStorage(BitmexOrder.name);
    if(savedOrders)
    this.Orders = savedOrders;
  }

  private setOrdersOnOrdesUpdated(){
    setTimeout( () => {
      if(this.bitmexServ.OrdersUpdated){
        var orders =  this.bitmexServ.getOrders();
        if (typeof orders !== "undefined" && orders !== null){
          this.Orders = orders;
        }
      }
    }, 2000);
  }

  private updateOrdersRuningTimes(){
    setInterval( () => {
      this.Orders.forEach((order, index) => {
        order.runingTime = utils.elapsedTime(new Date(), new Date(order.timestamp));
      });
    }, 1000);
  }
}
