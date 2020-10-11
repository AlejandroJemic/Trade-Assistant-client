import { Injectable, Type } from '@angular/core';
import * as io from 'socket.io-client';
import { Commands, BitemxState, BitmexOrder} from '../models/bitmex.model'
import { Observable } from 'rxjs';
import { plainToClass } from "class-transformer"; 
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
  private url: string = 'ws://localhost:4000/';
  private socket: any;
  
  public Orders: BitmexOrder[] = [];
  public OrdersUpdated: boolean = false;
  constructor() { 
   try {
      this.socket = io(this.url); // ,{transports: ['websocket']});
   } catch (err) {
     
   }
  }

  public getOrders(){
    return this.Orders;
  }

  public setOrders(Orders: BitmexOrder[]){
    this.Orders = Orders;
    this.OrdersUpdated = true;
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
