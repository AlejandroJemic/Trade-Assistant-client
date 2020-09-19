import { Component } from '@angular/core';
import { Commands } from '../models/bitmex.model';
import{BitmexService} from '../services/bitmex.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  bidPrice : string;
  constructor(private bitmex: BitmexService) {
    this.bitmex.sendMessage(Commands.subscribe, ['quote:XBTUSD'])
  }

  ngOnInit() {
    console.log('ready');
    this.bitmex.onNewMessage().subscribe(data => {
      //console.log('got timestamp: ' + data.timestamp + ', bitPrice: ' + data.bidPrice);
      
      var localTime = new Date();
      var LocalTimeStamp = new Date( data.timestamp);
      var Delay =(localTime.getTime() - LocalTimeStamp.getTime()) /1000;

      console.log('LocalTimeStamp: ' + LocalTimeStamp);
      console.log('localtime:      ' + localTime);
      console.log('delay: ' + Delay);
      
      this.bidPrice = data.bidPrice;
    });
  }




}








