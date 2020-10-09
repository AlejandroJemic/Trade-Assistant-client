import { Component, HostListener } from '@angular/core';
import { Commands , BitemxState} from '../models/bitmex.model';
import{BitmexService} from '../services/bitmex.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  startTime: Date ;
  runingTime: string;
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
  mensaje: string = '';
  showMesage: boolean;

  constructor(
    private bitmexServ: BitmexService)
    {
   // this.bitmex.sendMessage(Commands.subscribe, ['quote:XBTUSD'])
   this.startTime = new Date();
  }

  ngOnInit() {
    console.log('ready');
    this.setMesage("welcome !");  
    this.readStateFromSorege();
    this.setStateOnQuoteUpdated();
  }

  private setStateOnQuoteUpdated() {
    this.bitmexServ.onQuoteUpdated().subscribe(data => {
      //console.log('got timestamp: ' + data.timestamp + ', bitPrice: ' + data.bidPrice);
      var localTime = new Date();
      var LocalTimeStamp = new Date(data.timestamp);
      var Delay = (localTime.getTime() - LocalTimeStamp.getTime()) / 1000;
      // console.log('LocalTimeStamp: ' + LocalTimeStamp);
      // console.log('localtime:      ' + localTime);
      // console.log('delay: ' + Delay);
      // console.log('bidprice: '+  data.bidPrice);
      this.delay = Math.round(Delay).toString() + 's';
      this.bidPrice = +data.bidPrice;

      if (this.bidPrice > this.max)
        this.max = this.bidPrice;
      if (this.bidPrice < this.min)
        this.min = this.bidPrice;

      this.maxDelta = this.max - this.bidPrice;
      this.minDelta = this.bidPrice - this.min;
      this.minPercent = +((this.minDelta * 100) / this.bidPrice).toFixed(2);
      this.maxPercent = +((this.maxDelta * 100) / this.bidPrice).toFixed(2);
      this.totalDelta + this.minDelta + this.maxDelta;
      this.totalPercent = this.maxPercent + this.minPercent;
      this.runingTime = this.elapsedTime(localTime.getTime() - this.startTime.getTime());
      this.saveBitmexState();
    });
  }

  private readStateFromSorege() {
    var savedState: BitemxState = this.bitmexServ.readFromStorage(BitemxState.name);
    if (savedState !== null) {
      // console.log('reading saved data from local storage');
      this.startTime = new Date(savedState.startTime);
      this.bidPrice = savedState.bidPrice;
      this.delay = savedState.delay;
      this.max = savedState.max;
      this.maxPercent = savedState.maxPercent;
      this.maxDelta = savedState.maxDelta;
      this.min = savedState.min;
      this.minPercent = savedState.minPercent;
      this.minDelta = savedState.minDelta;
      this.totalDelta = savedState.totalDelta;
      this.totalPercent = savedState.totalPercent;
      this.runingTime = this.elapsedTime(new Date().getTime() - this.startTime.getTime());
    }
  }

  private setMesage(msg) {
     this.mensaje = msg;
    this.showMesage = this.mensaje.length > 0;
    setTimeout(() => {
      this.mensaje >= "";
      this.showMesage = false;
    }, 10000);
  }

  @HostListener('unloaded')
  ngOnDestroy(){
    if(this.bidPrice > 0) {
      this.saveBitmexState();
    }
  }

  private saveBitmexState() {
    // console.log('saving state to local storage')
    this.bitmexServ.saveToStoraje(BitemxState.name, new BitemxState(
      this.startTime,
      this.bidPrice,
      this.delay,
      this.max,
      this.maxPercent,
      this.maxDelta,
      this.min,
      this.minPercent,
      this.minDelta,
      this.totalDelta,
      this.totalPercent
    ));
  }

  elapsedTime (dif){
    var du = moment.duration(dif, "milliseconds");
    var d =  Math.round(du.days() +( du.months() * 30) + (du.years() *365 )).toString(); 
    var h =  String("000" + Math.round(du.hours()).toString()).slice(-2);
    var m =  String("000" + Math.round(du.minutes()).toString()).slice(-2);
    var s =  String("000" + Math.round(du.seconds()).toString()).slice(-2);
    return d + 'd ' + h + ':' + m + ':' + s
  }

  onReset(){
    this.mensaje = "";
    this.startTime = new Date();
    this.max =this.bidPrice;
    this.min =this.bidPrice;
    this.maxDelta = 0;
    this.minDelta = 0;
    this.minPercent =  +(0).toFixed(2);
    this.maxPercent = +(0).toFixed(2);
    this.totalDelta +0;
    this.totalPercent = 0;
    this.runingTime = this.elapsedTime(new Date().getTime() - this.startTime.getTime());

    var done = this.bitmexServ.removeFromStorage(BitemxState.name)
    if(done) {
      console.log('removing state from local storage');
    }
  }

}








