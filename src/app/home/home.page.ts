import { Component } from '@angular/core';
import { Commands } from '../models/bitmex.model';
import{BitmexService} from '../services/bitmex.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private bitmex: BitmexService) {
    this.bitmex.sendMessage(Commands.subscribe, ['quote:XBTUSD'])
  }
  ngOnInit() {
    console.log('ready');
    this.bitmex.onNewMessage().subscribe(msg => {
      console.log('got a msg: ' + msg);
    });
  }
}
