import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {BitemxModel, Commands} from '../models/bitmex.model'
import { Observable } from 'rxjs';

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

  constructor() { 
    this.socket = io(this.url); // ,{transports: ['websocket']});
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

  onNewMessage() {
    return Observable.create(observer => {
      this.socket.on('dataupdate', data => {
        // console.log(data);
        observer.next(data);
      });
    });
  }

}
