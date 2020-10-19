import { Injectable, Type } from '@angular/core';
import * as io from 'socket.io-client';
import { Commands, BitemxState, BitmexOrder} from '../models/bitmex.model'
import { Observable } from 'rxjs';
import { plainToClass } from "class-transformer"; 
import { environment } from 'src/environments/environment';
/**
 *
 *clase para conectar con la api de bitmex via web socket 
 * solome metodos publicos 
 * @export
 * @class BitmexService
 */
@Injectable({
  providedIn: 'root'
})
export class BitmexService {
  private url: string = environment.wsurl;
  private socket: any;
  
  public Orders: BitmexOrder[] = [];
  public OrdersUpdated: boolean = false;

  public ModifedsOrders: BitmexOrder[] = [];

  bidPrice: any;
  constructor() { 
   try {
      this.socket = io(this.url); // ,{transports: ['websocket']});
   } catch (err) {
     
   }
  }



  public setBidPrice(bidPrice: number)
  { this.bidPrice = bidPrice;}

  public getBidPrice(){
    return this.bidPrice;}

  public getOrders(){
    var Orders= this.readFromStorage(BitmexOrder.name);
    this.Orders = Orders;
    return this.Orders;
  }
  public getOrdersSorted(){
    var Orders= this.readFromStorage(BitmexOrder.name);
    this.Orders = Orders.sort((a, b) => (new Date(a.timestamp).getTime() < new Date(b.timestamp).getTime()   ? 1 : -1));;
    return this.Orders;
  }

  public setOrders(Orders: BitmexOrder[]){
    this.Orders = Orders;
    this.saveToStoraje(BitmexOrder.name, this.Orders);
    this.OrdersUpdated = true; 
  }

  public deleteOrder(orderID: string) { 
  return fetch(environment.deleteOrderUrl +  orderID)
        .then(res => res.json())
        .then(data => {return data});
  }

  public async cancelOrder(orderID: string) { 
    return await fetch(environment.cancelOrderUrl +  orderID)
          .then(res => res.json())
          .then(data => {return data});
    }

    public getModifedsOrders(){
      var ModifedsOrders= this.readFromStorage('Modifed' + BitmexOrder.name);
      this.ModifedsOrders = ModifedsOrders;
      return this.ModifedsOrders;
    }

    public addModifedOrders(ToMidifyOrder: BitmexOrder){
      this.getModifedsOrders();
      var  aux:  BitmexOrder[] = [];
      aux = this.ModifedsOrders.filter((order) =>{ order.orderID !== ToMidifyOrder.orderID})
      aux.push(ToMidifyOrder);
      this.ModifedsOrders = aux;
      this.saveToStoraje( 'Modifed' + BitmexOrder.name, this.ModifedsOrders);
    }
  
    public removeModifedOrders(orderId: string){
      this.getModifedsOrders();
      var  aux:  BitmexOrder[] = [];
      aux = this.ModifedsOrders.filter((order) =>{ order.orderID !== orderId})
      this.ModifedsOrders = aux;
      this.saveToStoraje( 'Modifed' + BitmexOrder.name, this.ModifedsOrders);
    }

  /**
   * enviar mensajes al servidor ws
   * @param {string} command accion
   * @param {string} args del tipo tabla:parametro o instrumento
   * @memberof BitmexService
   */
  public sendMessage(command:Commands ,args: Array<string>) {
    this.socket.emit('{"op": "' + command.toString() +'", "args":'+ args.join(',')+'}');
  }


  /**
   *
   * retorna un obserbable cuando se resive un mensaje dataupdate del wsio
   * @returns
   * @memberof BitmexService
   */
  onQuoteUpdated() {
    return Observable.create(observer => {
      this.socket.on('quoteupdate', data => {
        // console.log(data);
        observer.next(data);
      });
    });
  }

  onOrdersUpdated() {
   try {
      return Observable.create(observer => {
        this.socket.on('odersupdate', data => {
          console.log('resived orders update');
          observer.next(data);
        });
      });
   } catch (err) {
     
   }
  }

  onPositionsUpdated() {
    return Observable.create(observer => {
      this.socket.on('positionsupdate', data => {
        // console.log(data);
        observer.next(data);
      });
    });
  }

  saveToStoraje(keyName: string, jsonDada: any){
    localStorage.setItem(keyName,JSON.stringify(jsonDada));
  }

  readFromStorage(keyName: string, ): any {
    if (localStorage.getItem(keyName) !== null) {
      return plainToClass( BitemxState, JSON.parse(localStorage.getItem(keyName)));
    }
    else return null;
  }

  removeFromStorage(keyName):boolean {
    if (localStorage.getItem(keyName) === null)
        return false;
    localStorage.removeItem(keyName);
    return true;
  }

}
