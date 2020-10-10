import { Component, OnInit } from '@angular/core';
import {  BitmexOrder,orderTypes, orderSides,orderStatuses, symbols } from '../../models/bitmex.model';
import{BitmexService} from '../../services/bitmex.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  Orders: BitmexOrder[];
  constructor( private bitmexServ: BitmexService) { }

  ngOnInit() {
    this.setOrdersOnOrdesUpdated();
  }

  private setOrdersOnOrdesUpdated()
  {
    this.bitmexServ.onOrdersUpdated().subscribe( data => {
      if (data && data.length > 0){
        var match = false;
        data.forEach((dataOrder, index) =>{
          match = false;
          if(this.Orders.length > 0){
            this.Orders.forEach((order, index2) =>{
               if(order.orderID == dataOrder.orderID) {
                  match = true;
                  order.orderID = dataOrder.orderID, 
                  order.ordType =  dataOrder.ordType, 
                  order.orderQty =  dataOrder.orderQty, 
                  order.ordStatus =  dataOrder.ordStatus, 
                  order.symbol =  dataOrder.symbol, 
                  order.leavesQty =  dataOrder.leavesQty, 
                  order.side =  dataOrder.side, 
                  order.stopPx = dataOrder.stopPx, 
                  order.price = dataOrder.price, 
                  order.avgPx = dataOrder.avgPx
              };
            });
          }
          if (!match)
          {
            this.Orders.push(new BitmexOrder(
              dataOrder.orderID, 
              dataOrder.ordType, 
              dataOrder.orderQty, 
              dataOrder.ordStatus, 
              dataOrder.symbol, 
              dataOrder.leavesQty, 
              dataOrder.side, 
              dataOrder.stopPx, 
              dataOrder.price, 
              dataOrder.avgPx
            ));
          }
        });
      }
    });
  }

}
