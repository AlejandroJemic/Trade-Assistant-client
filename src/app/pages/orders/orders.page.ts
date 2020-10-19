import { Component, OnInit } from '@angular/core';
import { utils } from 'src/app/services/utils';
import {  BitmexOrder } from '../../models/bitmex.model';
import{BitmexService} from '../../services/bitmex.service'; 
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  Orders: BitmexOrder[] = [] ;
  constructor( public bitmexServ: BitmexService,
    public alertController: AlertController) { }

  ngOnInit() {
    this.readOrdersFromStorage();
    this.setOrdersOnOrdesUpdated();
    this.updateOrdersRuningTimes();
  }

  private readOrdersFromStorage(){
    var savedOrders :BitmexOrder[] = this.bitmexServ.getOrdersSorted();
    if(savedOrders)
    this.Orders = savedOrders;
  }

  private setOrdersOnOrdesUpdated(){
    setInterval( () => {
      if(this.bitmexServ.OrdersUpdated){
        var orders =  this.bitmexServ.getOrders();
          if (typeof orders !== "undefined" && orders !== null){
          this.Orders = orders;
        }
      }
    }, 5000);
  }

  private updateOrdersRuningTimes(){
    setInterval( () => {
      this.Orders.forEach((order, index) => {
        var orderPrice = order.price + order.stopPx + order.avgPx;
        order.delta  =  this.bitmexServ.getBidPrice() - orderPrice;
        order.runingTime = utils.elapsedTime(new Date(), new Date(order.timestamp));
      });
      this.bitmexServ.setOrders(this.Orders);
      this.Orders = this.bitmexServ.getOrdersSorted();

    }, 5000);
  }

  // #region Actions Handlers

  public async handleTrash(orderId:string){
    const confirmation = await this.presentAlertConfirm('Delete?');
    if (confirmation) this.trash(orderId);
  }

  public trash(orderId:string){
    this.Orders = this.Orders.filter(function( obj ) {
      return obj.orderID !== orderId;
    })
    this.bitmexServ.saveToStoraje(BitmexOrder.name, this.Orders);
    this.bitmexServ.deleteOrder(orderId).then((res) =>{
      if(res.Ok !== true){
        console.log(res.data.message);
      }
    });
  }

  public async handleCancel(orderId:string){
    var modifedsOrders = this.bitmexServ.getModifedsOrders();

    if(modifedsOrders.some((order) =>{ order.orderID === orderId}))
    {
      const confirmation = await this.presentAlertConfirm('Discard order modifications?');
      if (confirmation) this.bitmexServ.removeModifedOrders(orderId);
    }
    else
    {
      const confirmation = await this.presentAlertConfirm('Cancel Current Order?');
      if (confirmation) this.cancel(orderId);
    }
  }

  public cancel(orderId:string){
    this.Orders = this.Orders.filter(function( obj ) {
      return obj.orderID !== orderId;
    })
    this.bitmexServ.saveToStoraje(BitmexOrder.name, this.Orders);
    this.bitmexServ.cancelOrder(orderId).then((res) =>{
      if(res.Ok !== true){
        console.log(res.data.message);
      }
    });
  }

  // #endregion

  public handleRemovePrice(orderID:string){

  }

  public handleAddPrice(orderID:string){

  }

  public handleRemoveQty(orderID:string){

  }

  public handleAddQty(orderID:string){

  }
 
 
  async presentAlertConfirm(msg: string) {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        message: `<strong>${msg}</strong>  !!!`,
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: 'YES',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }
 
}
