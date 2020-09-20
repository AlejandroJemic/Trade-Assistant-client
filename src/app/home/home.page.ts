import { Component } from '@angular/core';
import { Commands } from '../models/bitmex.model';
import{BitmexService} from '../services/bitmex.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  startTime: Date ;
  bidPrice : number = 0;
  delay: string;
  max: number = 0;
  maxPercent: number = 0;
  maxDelta: number =0;
  min: number = Number.MAX_SAFE_INTEGER;
  minPercent: number;
  minDelta: number = 0;
  totalDelta: number = 0;
  totalPercent: number = 0;
  constructor(private bitmex: BitmexService) {
   // this.bitmex.sendMessage(Commands.subscribe, ['quote:XBTUSD'])
   this.startTime = new Date();
   
  }

  ngOnInit() {
    console.log('ready');
    this.bitmex.onNewMessage().subscribe(data => {
      //console.log('got timestamp: ' + data.timestamp + ', bitPrice: ' + data.bidPrice);
      
      var localTime = new Date();
      var LocalTimeStamp = new Date( data.timestamp);
      var Delay =(localTime.getTime() - LocalTimeStamp.getTime()) /1000;

      // console.log('LocalTimeStamp: ' + LocalTimeStamp);
      // console.log('localtime:      ' + localTime);
      // console.log('delay: ' + Delay);
      // console.log('bidprice: '+  data.bidPrice);

      this.delay = Math.round(Delay).toString() +'s'; 
      this.bidPrice =  + data.bidPrice;

      if(this.bidPrice > this.max) this.max = this.bidPrice;
      if(this.bidPrice < this.min) this.min = this.bidPrice;

      this.maxDelta = this.max - this.bidPrice;
      this.minDelta = this.bidPrice - this.min;
      this.minPercent =  +((this.minDelta * 100) / this.bidPrice).toFixed(2);
      this.maxPercent = +((this.maxDelta * 100) / this.bidPrice).toFixed(2);
      this.totalDelta + this.minDelta + this.maxDelta;
      this.totalPercent = this.maxPercent + this.minPercent;
    });
  }




}








