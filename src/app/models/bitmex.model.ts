export class BitemxState {
      startTime: Date ;
      runingTime: string;
      bidPrice : number ;
      delay: string;
      max: number;
      maxPercent: number;
      maxDelta: number;
      min: number;
      minPercent: number;
      minDelta: number;
      totalDelta: number;
      totalPercent: number;

      constructor(startTime: any,
      bidPrice :  any,
      delay:  any,
      max:  any,
      maxPercent:  any,
      maxDelta:  any,
      min:  any,
      minPercent:  any,
      minDelta:  any,
      totalDelta:  any,
      totalPercent:  any,){
            this.startTime = startTime;
            this.bidPrice  =  bidPrice;
            this.delay  = delay;
            this.max  = max;
            this.maxPercent = maxPercent;
            this.maxDelta = maxDelta;
            this.min =  min;
            this.minPercent = minPercent ;
            this.minDelta =  minDelta ;
            this.totalDelta = totalDelta ;
            this.totalPercent = totalPercent 
      }
      
      getName() {
      return this.constructor.name;
      }
}

export class BitmexOrder{
      orderID : string;  //"8fdf340f-b717-400e-b14a-6bd2da2d3467",
      ordType : string;// "Stop",  "Market",
      orderQty : number;  // 1
      ordStatus : string; // "New", "Canceled" , "Filled",
      symbol : string; // "XBTUSD",
      leavesQty: number;  //   1, 0
      side : string; // "Buy", "Sell"
      stopPx : number;  // 8500
      price : number;  // 10652.5 , null
      avgPx : number;  // 10653
      currency: string;
      timestamp: Date;

      constructor(orderID : string,
            ordType : string,
            orderQty : number,
            ordStatus : string,
            symbol : string,
            leavesQty: number,
            side : string,
            stopPx : number,
            price : number,
            avgPx : number,
            currency: string,
            timestamp: Date
            ){
                  this.orderID = orderID; 
                  this.ordType = ordType; 
                  this.orderQty = orderQty; 
                  this.ordStatus = ordStatus; 
                  this.symbol = symbol; 
                  this.leavesQty= leavesQty; 
                  this.side = side; 
                  this.stopPx = stopPx; 
                  this.price = price; 
                  this.avgPx = avgPx; 
                  this.currency = currency;
                  this.timestamp = timestamp;
      }

      getName() {
      return this.constructor.name;
      }
}

export enum orderTypes{
      Stop = "Stop", 
      Market = "Market"
} 

export enum orderStatuses{
      New = "New", 
      Canceled = "Canceled" , 
      Filled = "Filled"
}

export enum symbols{
      XBTUSD = "XBTUSD"
}

export enum orderSides{
       Buy = "Buy",
       Sell = "Sell"
}

export enum Commands {
      subscribe  = 'subscribe' ,
      unsubscribe = 'unsubscribe'
}